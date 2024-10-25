import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Alert,
  Snackbar,
  LinearProgress,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Stack,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slider,
  Chip
} from '@mui/material';
import {
  AutoStories,
  Download,
  Share,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  ThumbUp,
  Videocam,
  Speed,
  Mood,
  Language,
  AccessTime
} from '@mui/icons-material';

// Styled Components with Enhanced Aesthetics
const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  background: 'linear-gradient(0deg, #111827 0%, #581C8B 50%, #111827 100%)',
  fontFamily: "'Poppins', sans-serif",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(88, 28, 135, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  color: '#fff',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(2),
    border: '1px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  textTransform: 'uppercase', // Match text-transform from .btn-grad
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  transition: 'background-position 0.5s ease-in-out', // Smooth transition for background
  background: 'linear-gradient(to right, #fc00ff 0%, #00dbde 51%, #fc00ff 100%)',
  backgroundSize: '200% auto', // Match background size from .btn-grad
  color: 'white',
  boxShadow: '0 0 10px #eee',
  display: 'block',

  // Hover effect
  '&:hover': {
    backgroundPosition: 'right center', // Change background position on hover
    color: '#fff',
    textDecoration: 'none',
  },
}));

const AIStoryGenerator = () => {
  // State Management
  const [genre, setGenre] = useState('Fantasy');
  const [length, setLength] = useState('Short Story');
  const [audience, setAudience] = useState('Young Adult');
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [shareDialog, setShareDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [feedback, setFeedback] = useState({ rating: 0, likes: 0 });
  const [duration, setDuration] = useState(60);
  const [videoUrl, setVideoUrl] = useState(null);
  const [voiceStyle, setVoiceStyle] = useState('Cheerful');
  const [narrationSpeed, setNarrationSpeed] = useState(1);
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Casual');

  // Constants
  const lengthOptions = {
    'Micro Fiction': '100 words',
    'Flash Fiction': '1000 words',
    'Short Story': '7500 words',
    'Novella': '20000 words'
  };

  const voiceStyles = [
    { value: 'Cheerful', icon: '😊' },
    { value: 'Sad', icon: '😢' },
    { value: 'Excited', icon: '🤩' },
    { value: 'Mysterious', icon: '🤔' },
    { value: 'Terrified', icon: '😱' },
    { value: 'Angry', icon: '😠' }
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian',
    'Japanese', 'Korean', 'Chinese', 'Russian', 'Arabic'
  ];

  // Handle social sharing
  const handleShare = (platform) => {
    // Implement sharing logic for each platform
    const shareUrls = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedStory.substring(0, 280))}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(generatedStory)}`
    };

    window.open(shareUrls[platform], '_blank');
    setShareDialog(false);
    setSnackbar({
      open: true,
      message: `Shared on ${platform}!`,
      severity: 'success'
    });
  };
  // Video Generation Helper Function
const generateVideo = async (script, voiceStyle) => {
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
            voice_config: {
              style: voiceStyle,
            },
          },
          input: script,
        },
        config: {
          fluent: 'true',
          pad_audio: '0.0',
        },
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

// Generate story using OpenAI API
const handleGenerateStory = async () => {
  try {
    setLoading(true);
    setError(null);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 90));
    }, 500);

    const systemPrompt = `You are a creative writing AI that specializes in ${genre} stories for ${audience} audiences. 
      Create a ${length} story that captures the essence of the genre while maintaining appropriate content and complexity.`;

    const userPrompt = prompt || `Create a compelling ${genre} story`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 100
      })
    });

    clearInterval(progressInterval);

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    setGeneratedStory(data.choices[0].message.content);
    setProgress(100);
    
    setSnackbar({
      open: true,
      message: 'Story generated successfully!',
      severity: 'success'
    });
  } catch (error) {
    setError(error.message);
    setSnackbar({
      open: true,
      message: `Error: ${error.message}`,
      severity: 'error'
    });
  } finally {
    setLoading(false);
  }
};

// Generate video from story
const handleGenerateVideo = async () => {
  try {
    setVideoLoading(true);
    setError(null);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 95));
    }, 1000);

    const videoUrl = await generateVideo(generatedStory, voiceStyle);
    setVideoUrl(videoUrl);
    
    clearInterval(progressInterval);
    setProgress(100);

    setSnackbar({
      open: true,
      message: 'Video generated successfully!',
      severity: 'success'
    });
  } catch (error) {
    setError(error.message);
    setSnackbar({
      open: true,
      message: `Error generating video: ${error.message}`,
      severity: 'error'
    });
  } finally {
    setVideoLoading(false);
  }
};

// Handle story download
const handleDownload = () => {
  try {
    const element = document.createElement('a');
    const file = new Blob([generatedStory], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `story_${genre.toLowerCase()}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setSnackbar({
      open: true,
      message: 'Story downloaded successfully!',
      severity: 'success'
    });
  } catch (error) {
    setSnackbar({
      open: true,
      message: 'Download failed: ' + error.message,
      severity: 'error'
    });
  }
};

  return (
    <StyledBox sx={{ pt: 15 }}>
      <Grid container spacing={4}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h3" align="center" sx={{ 
            color: '#fff',
            marginBottom: 4,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(88, 28, 135, 0.5)'
          }}>
            AI Story Generator
          </Typography>
        </Grid>

        {/* Configuration Panel */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              {/* Basic Settings */}
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                <AutoStories sx={{ mr: 1 }} /> Story Settings
              </Typography>
              
              <Grid container spacing={3}>
                {/* Genre Selection */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#fff' }}>
                      Genre
                    </Typography>
                    <Select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                      }}
                    >
                      {['Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Horror', 'Adventure'].map((type) => (
                        <MenuItem key={type} value={type}>
                          <Chip 
                            label={type} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(124, 58, 237, 0.2)',
                              color: '#fff'
                            }} 
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Language Selection */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#fff' }}>
                      Language
                    </Typography>
                    <Select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                      }}
                      startAdornment={<Language sx={{ mr: 1 }} />}
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

                    {/* Target Audience */}
                          <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                  Target Audience
                </Typography>
                <Select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                  }}
                >
                  {['Children', 'Young Adult', 'Adult', 'All Ages'].map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Video Generation Settings */}
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', mt: 4, display: 'flex', alignItems: 'center' }}>
                <Videocam sx={{ mr: 1 }} /> Video Settings
              </Typography>

              {/* Duration Slider */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, fontSize: 20 }} /> Duration
                </Typography>
                <Slider
                  value={duration}
                  onChange={(_, newValue) => setDuration(newValue)}
                  min={15}
                  max={600}
                  step={15}
                  marks={[
                    { value: 15, label: '15s' },
                    { value: 300, label: '5m' },
                    { value: 600, label: '10m' },
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`}
                  sx={{
                    color: 'rgb(124, 58, 237)',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#fff',
                    },
                  }}
                />
              </Box>

              {/* Voice Settings */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                      <Mood sx={{ mr: 1, fontSize: 20 }} /> Voice Style
                    </Typography>
                    <Select
                      value={voiceStyle}
                      onChange={(e) => setVoiceStyle(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                      }}
                    >
                      {voiceStyles.map(({ value, icon }) => (
                        <MenuItem key={value} value={value}>
                          {icon} {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                    <Speed sx={{ mr: 1, fontSize: 20 }} /> Narration Speed
                  </Typography>
                  <Slider
                    value={narrationSpeed}
                    onChange={(_, newValue) => setNarrationSpeed(newValue)}
                    min={0.5}
                    max={2}
                    step={0.1}
                    marks={[
                      { value: 0.5, label: '0.5x' },
                      { value: 1, label: '1x' },
                      { value: 2, label: '2x' },
                    ]}
                    valueLabelDisplay="auto"
                    sx={{
                      color: 'rgb(124, 58, 237)',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#fff',
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Story Prompt */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#fff' }}>
                  Story Prompt
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your story prompt or ideas..."
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#fff',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <StyledButton
                  fullWidth
                  onClick={handleGenerateStory}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoStories />}
                >
                  {loading ? 'Generating Story...' : 'Generate Story'}
                </StyledButton>

                <StyledButton
                  fullWidth
                  onClick={() => {}}
                  disabled={videoLoading || !generatedStory}
                  startIcon={videoLoading ? <CircularProgress size={20} color="inherit" /> : <Videocam />}
                >
                  {videoLoading ? 'Generating Video...' : 'Generate Video'}
                </StyledButton>
              </Stack>

              {/* Progress Indicator */}
              {(loading || videoLoading) && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress}
                    sx={{
                      backgroundColor: 'rgba(124, 58, 237, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgb(124, 58, 237)',
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#fff', display: 'block', textAlign: 'center', mt: 1 }}>
                    {loading ? 'Crafting your story...' : 'Generating video...'}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Generated Story Display */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                <AutoStories sx={{ mr: 1 }} /> Generated Story
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {generatedStory ? (
                <>
                  <Box sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    p: 3, 
                    borderRadius: 2,
                    maxHeight: '500px',
                    overflowY: 'auto',
                    mb: 3
                  }}>
                    <Typography sx={{ color: '#fff', whiteSpace: 'pre-wrap' }}>
                      {generatedStory}
                    </Typography>
                  </Box>

                  {/* Story Controls */}
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <StyledButton
                      startIcon={<Download />}
                      onClick={handleDownload}
                      disabled={!generatedStory}
                    >
                      Download Story
                    </StyledButton>
                    <StyledButton
                      startIcon={<Share />}
                      onClick={() => setShareDialog(true)}
                      disabled={!generatedStory}
                    >
                      Share
                    </StyledButton>
                  </Stack>

                  {/* Feedback Section */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#fff' }}>
                      Rate this story
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Rating 
                        value={feedback.rating}
                        onChange={(_, newValue) => {
                          setFeedback(prev => ({ ...prev, rating: newValue }));
                          setSnackbar({
                            open: true,
                            message: 'Thank you for your feedback!',
                            severity: 'success'
                          });
                        }}
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: 'rgb(124, 58, 237)',
                          },
                        }}
                      />
                      <IconButton 
                        onClick={() => {
                          setFeedback(prev => ({ ...prev, likes: prev.likes + 1 }));
                          setSnackbar({
                            open: true,
                            message: 'Thanks for the like!',
                            severity: 'success'
                          });
                        }}
                        sx={{ color: '#fff' }}
                      >
                        <ThumbUp />
                      </IconButton>
                      <Typography sx={{ color: '#fff' }}>{feedback.likes}</Typography>
                    </Stack>
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2
                }}>
                  <Typography sx={{ color: '#fff', mb: 2 }}>
                    Your generated story will appear here
                  </Typography>
                  <AutoStories sx={{ fontSize: 48, color: 'rgba(124, 58, 237, 0.5)' }} />
                </Box>
              )}

              {/* Video Preview Section */}
              {videoUrl && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                    <Videocam sx={{ mr: 1 }} /> Generated Video
                  </Typography>
                  <Box sx={{ 
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <video
                      src={videoUrl}
                      controls
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </Box>
                  <StyledButton
                    fullWidth
                    startIcon={<Download />}
                    onClick={() => window.open(videoUrl)}
                    sx={{ mt: 2 }}
                  >
                    Download Video
                  </StyledButton>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Share Dialog */}
      <Dialog
        open={shareDialog}
        onClose={() => setShareDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: 'rgb(17, 24, 39)',
            color: '#fff',
            maxWidth: 'sm'
          }
        }}
      >
        <DialogTitle>Share Your Story</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {[
              { icon: <Facebook />, name: 'Facebook' },
              { icon: <Twitter />, name: 'Twitter' },
              { icon: <LinkedIn />, name: 'LinkedIn' },
              { icon: <WhatsApp />, name: 'WhatsApp' }
            ].map((platform) => (
              <StyledButton
                key={platform.name}
                fullWidth
                startIcon={platform.icon}
                onClick={() => {
                  // Implement sharing functionality
                  setShareDialog(false);
                  setSnackbar({
                    open: true,
                    message: `Shared on ${platform.name}!`,
                    severity: 'success'
                  });
                }}
              >
                Share on {platform.name}
              </StyledButton>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            bgcolor: snackbar.severity === 'success' ? 'rgb(124, 58, 237)' : undefined
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default AIStoryGenerator;