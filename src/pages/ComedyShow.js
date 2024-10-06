import React, { useState } from 'react';
import { PaperclipIcon, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { 
  Alert,
  AlertDescription 
} from '../components/ui/alert';

// Custom Toggle Switch component
const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="mr-3 font-bold">Custom Options</div>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
        />
        <div
          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
            isOn ? 'bg-blue-500' : 'bg-gray-600'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 transform ${
            isOn ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
};

// Helper function to convert base64 to blob
const base64ToBlob = (base64) => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([uInt8Array], { type: contentType });
};

const checkIfHuman = async (base64Image) => {
  try {
    const blob = base64ToBlob(base64Image);
    const formData = new FormData();
    formData.append('image', blob);

    const response = await fetch('https://YOUR_AZURE_ENDPOINT/vision/v3.2/analyze?visualFeatures=Objects,Faces', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_API_KEY
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    
    const hasHuman = data.objects?.some(obj => 
      ['person', 'man', 'woman', 'child', 'human'].includes(obj.object.toLowerCase())
    ) || data.faces?.length > 0;

    if (!hasHuman) {
      throw new Error('No human detected in the image. Please upload an image containing a person.');
    }

    return true;
  } catch (error) {
    console.error('Error in human detection:', error);
    throw new Error(error.message || 'Failed to process image');
  }
};

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
                text: 'Analyze this image and describe the key elements that could be used in a comedy routine. Focus on notable objects, activities, or situations that could be funny.'
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

const ComedyShow = () => {
  const [isCustom, setIsCustom] = useState(false);
  const [theme, setTheme] = useState('Standup');
  const [audience, setAudience] = useState('Everyone');
  const [duration, setDuration] = useState('15 seconds');
  const [character, setCharacter] = useState('');
  const [prompt, setPrompt] = useState('');
  const [characterImage, setCharacterImage] = useState(null);
  const [additionalImage, setAdditionalImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(null);

  const handleImageUpload = async (e, type) => {
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
      setStatusMessage(`Processing ${type} image...`);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        
        if (type === 'character') {
          try {
            const isHuman = await checkIfHuman(base64Image);
            if (isHuman) {
              setCharacterImage(base64Image);
              setStatusMessage('Character image uploaded successfully');
            }
          } catch (error) {
            setError(error.message);
            setCharacterImage(null);
          }
        } else {
          setAdditionalImage(base64Image);
          setStatusMessage('Additional image uploaded successfully');
        }
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

  const generateVideo = async (script) => {
    const createTalkUrl = 'https://api.d-id.com/talks';
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Basic ${process.env.REACT_APP_D_ID_API_KEY}`,
    };

    try {
      // Step 1: Create a talk
      const createTalkResponse = await fetch(createTalkUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          source_url: characterImage,
          script: {
            type: 'text',
            subtitles: 'false',
            provider: {
              type: 'microsoft',
              voice_id: 'Sara',
              voice_config: { style: 'Cheerful' },
            },
            input: script,
          },
          config: { fluent: 'false', pad_audio: '0.0' },
        }),
      });

      const createTalkData = await createTalkResponse.json();

      if (!createTalkData.id) {
        throw new Error('Failed to create talk');
      }

      // Step 2: Poll for the talk status and get the result_url
      const talkId = createTalkData.id;
      let resultUrl = null;

      while (!resultUrl) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const getTalkResponse = await fetch(`${createTalkUrl}/${talkId}`, {
          method: 'GET',
          headers: headers,
        });

        const getTalkData = await getTalkResponse.json();

        if (getTalkData.status === 'done' && getTalkData.result_url) {
          resultUrl = getTalkData.result_url;
        } else if (getTalkData.status === 'error') {
          throw new Error('Video generation failed');
        }
      }

      return resultUrl;
    } catch (error) {
      console.error('Error generating video:', error);
      throw new Error('Video generation failed');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatusMessage('Processing your request...');

    try {
      if (!characterImage) {
        throw new Error('Please upload a character image');
      }

      if (!character.trim()) {
        throw new Error('Please provide a character name');
      }

      // Analyze additional image and generate script
      let scriptPrompt = `Generate a ${
        isCustom ? duration : '15 seconds'
      } ${isCustom ? theme : 'Standup'} comedy script for a ${
        isCustom ? audience : 'Everyone'
      } audience. The main character is ${character}. Additional context: ${prompt}`;

      if (additionalImage) {
        setStatusMessage('Analyzing additional image...');
        const imageAnalysis = await analyzeImage(additionalImage);
        scriptPrompt += ` Incorporate the following elements from the additional image: ${imageAnalysis}`;
      }

      // Generate script using ChatGPT API
      setStatusMessage('Generating script...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: scriptPrompt }],
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      const script = data.choices[0].message.content;

      // Generate video
      setStatusMessage('Generating video...');
      const videoUrl = await generateVideo(script);
      setVideoUrl(videoUrl);
      setStatusMessage('Video generated successfully!');
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-between bg-gray-800 text-white p-6">
      {/* Form Section */}
      <form
        onSubmit={handleFormSubmit}
        className="w-1/2 bg-gray-900 p-6 rounded-md shadow-md space-y-6"
      >
        {/* Custom Toggle */}
        <div className="flex items-center justify-between">
          <ToggleSwitch
            isOn={isCustom}
            handleToggle={() => setIsCustom(!isCustom)}
          />
        </div>

        {/* Conditional Rendering for Custom Options */}
        {isCustom && (
          <div className="space-y-4">
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

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Target Audience
              </label>
              <div className="flex flex-wrap gap-2">
                {['Everyone', 'Kids', 'Teens', 'Adults', 'Seniors'].map(
                  (item) => (
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
                  )
                )}
              </div>
            </div>

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
          </div>
        )}

        {/* Character Input */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Character</label>
          <div className="relative">
            <input
              type="text"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter character name"
            />
            <label
              htmlFor="characterImageUpload"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <PaperclipIcon className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              <input
                type="file"
                id="characterImageUpload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'character')}
                className="sr-only"
              />
            </label>
          </div>
          {characterImage && (
            <div className="mt-2 text-sm text-green-400">
              Character image uploaded successfully
            </div>
          )}
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
              onChange={(e) => handleImageUpload(e, 'additional')}
              className="sr-only"
            />
          </label>
        </div>
        {additionalImage && (
          <div className="mt-2 text-sm text-green-400">
            Additional image uploaded successfully
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
            'Generate Comedy Show'
          )}
        </button>

        {/* Error Display */}
        {error && (
          <Alert variant="error" className="mt-4">
            <AlertCircle className="mr-2 w-5 h-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Status Message */}
        {statusMessage && !error && (
          <Alert variant="info" className="mt-4">
            <CheckCircle className="mr-2 w-5 h-5" />
            <AlertDescription>{statusMessage}</AlertDescription>
          </Alert>
        )}
      </form>

      {/* Output Section */}
      <div className="w-1/2 p-6">
        {loading ? (
          <p className="text-xl font-bold">{statusMessage}</p>
        ) : videoUrl ? (
          <div>
            <h3 className="text-lg font-bold mb-4">Generated Video:</h3>
            <video
              src={videoUrl}
              controls
              className="w-full rounded shadow-lg"
            ></video>
          </div>
        ) : (
          <p className="text-lg">Your generated comedy show will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default ComedyShow;
