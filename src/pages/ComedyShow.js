import React, { useState } from 'react';
import { PaperclipIcon, Loader2, X } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert'; // Corrected import path for Alert

const analyzeImage = async (base64Image) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image and describe the key elements that could be used in a comedy routine.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in image analysis:', error);
    throw new Error('Failed to analyze the additional image');
  }
};

const generateVideo = async (script) => {
  const createTalkUrl = 'https://api.d-id.com/talks';
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Basic ${process.env.REACT_APP_D_ID_API_KEY}`,
  };

  try {
    const createTalkResponse = await fetch(createTalkUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        source_url: 'https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg',
        script: {
          type: 'text',
          subtitles: 'true',
          provider: {
            type: 'microsoft',
            voice_id: 'Sara',
            voice_config: { style: 'Cheerful' },
          },
          input: script,
        },
        config: { fluent: 'true', pad_audio: '0.0' },
      }),
    });

    if (!createTalkResponse.ok) {
      const errorData = await createTalkResponse.json();
      throw new Error(errorData.message || 'Failed to create video');
    }

    const createTalkData = await createTalkResponse.json();
    if (!createTalkData.id) {
      throw new Error('Failed to create talk: No ID received');
    }

    const talkId = createTalkData.id;
    let resultUrl = null;
    let attempts = 0;
    const maxAttempts = 12;

    while (!resultUrl && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      attempts++;

      const getTalkResponse = await fetch(`${createTalkUrl}/${talkId}`, {
        method: 'GET',
        headers: headers,
      });

      if (!getTalkResponse.ok) {
        throw new Error('Failed to check video status');
      }

      const getTalkData = await getTalkResponse.json();

      if (getTalkData.status === 'done' && getTalkData.result_url) {
        resultUrl = getTalkData.result_url;
      } else if (getTalkData.status === 'error') {
        throw new Error(getTalkData.error?.message || 'Video generation failed');
      }
    }

    if (!resultUrl) {
      throw new Error('Video generation timed out');
    }

    return resultUrl;
  } catch (error) {
    console.error('Error generating video:', error);
    throw new Error(`Video generation failed: ${error.message}`);
  }
};

const ComedyShow = () => {
  const [theme, setTheme] = useState('Standup');
  const [audience, setAudience] = useState('Everyone');
  const [duration, setDuration] = useState('15 seconds');
  const [prompt, setPrompt] = useState('');
  const [additionalImage, setAdditionalImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(null);
  const [generatedScript, setGeneratedScript] = useState('');

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('Image size should be less than 5MB');
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Please upload a valid image file (JPEG, PNG)');
      }

      setLoading(true);
      setError(null);
      setStatusMessage(`Processing image...`);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setAdditionalImage(base64Image);
        setStatusMessage('Image uploaded successfully');
        setLoading(false);
      };

      reader.onerror = () => {
        setError('Failed to read the image file');
        setLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setAdditionalImage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setError(null);
    setStatusMessage('Processing your request...');
    setGeneratedScript('');
    setVideoUrl(null);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);

    try {
      setStatusMessage('Generating comedy script...');
      let scriptPrompt = `Generate a ${duration} ${theme} comedy script for a ${audience} audience, containing only spoken dialogue without any stage directions, character names, or audience reactions. Additional context: ${prompt}`;

      if (additionalImage) {
        setStatusMessage('Analyzing additional image...');
        const imageAnalysis = await analyzeImage(additionalImage);
        scriptPrompt += ` Incorporate the following elements from the additional image: ${imageAnalysis}`;
      }

      const scriptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: scriptPrompt }],
          max_tokens: 500,
        }),
      });
      
      if (!scriptResponse.ok) {
        const errorData = await scriptResponse.json();
        console.error('Error details:', errorData); // Log error details
        throw new Error(errorData.message || 'Failed to generate script');
      }      

      const scriptData = await scriptResponse.json();
      const script = scriptData.choices[0].message.content;
      setGeneratedScript(script);

      setStatusMessage('Generating video...');
      try {
        const videoUrl = await generateVideo(script);
        setVideoUrl(videoUrl);
        setStatusMessage('Video generated successfully!');
      } catch (videoError) {
        setError(`Unable to generate video: ${videoError.message}`);
        setStatusMessage('Script generated successfully, but video generation failed.');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between bg-gray-800 text-white p-6">
      {/* Form Section */}
      <form
        onSubmit={handleFormSubmit}
        className="w-full lg:w-1/2 bg-gray-900 p-6 rounded-md shadow-md space-y-6"
      >
        {/* Theme Selection */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Theme</label>
          <div className="flex flex-wrap gap-2">
            {['Standup', 'Sketch', 'Roast', 'Musical'].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 rounded-full transition-colors ${
                  theme === item
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setTheme(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Audience Selection */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Target Audience</label>
          <div className="flex flex-wrap gap-2">
            {['Everyone', 'Kids', 'Teens', 'Adults', 'Seniors'].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 rounded-full transition-colors ${
                  audience === item
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setAudience(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Duration</label>
          <div className="flex flex-wrap gap-2">
            {['15 seconds', '1 minute', '3 minutes', '5 minutes', '10 minutes'].map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 rounded-full transition-colors ${
                  duration === item
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setDuration(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Image Upload Section */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Additional Context</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter additional context or description for the comedy show"
            ></textarea>
            <label
              htmlFor="additionalImageUpload"
              className="absolute right-2 top-5 -translate-y-1/2 cursor-pointer"
            >
              <PaperclipIcon className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              <input
                type="file"
                id="additionalImageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
          </div>
          {additionalImage && (
            <div className="mt-2 flex items-center">
              <img src={additionalImage} alt="Uploaded" className="max-w-xs rounded-md" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="ml-2 p-1 bg-red-500 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${
            loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Generating...
            </span>
          ) : (
            'Generate Comedy Script'
          )}
        </button>

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-600 rounded-full mt-4">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Generated Script Display */}
        {generatedScript && (
          <div className="bg-gray-900 p-4 rounded-md mt-4" style={{ height: '256px', overflowY: 'auto' }}>
            <h3 className="text-lg font-bold mb-2">Generated Script:</h3>
            <pre className="whitespace-pre-wrap text-sm">{generatedScript}</pre>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="error" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Status Message */}
        {statusMessage && !error && (
          <Alert variant="info" className="mt-4">
            <AlertDescription>{statusMessage}</AlertDescription>
          </Alert>
        )}
      </form>

      {/* Output Section */}
      <div className="w-full lg:w-1/2 p-6 space-y-6">
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="animate-spin w-5 h-5" />
            <p className="text-xl font-bold">{statusMessage}</p>
          </div>
        ) : (
          <>
            {videoUrl ? (
              <div>
                <h3 className="text-lg font-bold mb-4">Generated Video:</h3>
                <video
                  src={videoUrl}
                  controls
                  className="w-full rounded shadow-lg"
                ></video>
              </div>
            ) : (
              !loading && !error && (
                <p className="text-lg">Your generated comedy show will appear here.</p>
              )
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  {error}
                  {!generatedScript && (
                    <p className="mt-2">Please try again or contact support if the issue persists.</p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ComedyShow;
