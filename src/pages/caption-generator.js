import React, { useState, useRef } from 'react';
import { 
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Slider,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  CloudUpload,
  Refresh,
  ContentCopy,
  TagRounded,
  Help,
  AutoAwesome,
  Share,
  Delete,
  PhotoCamera,
  Tune,
  SaveAlt,
  FormatSize,
  ColorLens
} from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
  },
});


const CaptionGenerator = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [tone, setTone] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState([]);
  const [hashtagCount, setHashtagCount] = useState(5);
  const [generatedHashtags, setGeneratedHashtags] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedPlatform, setPlatform] = useState('instagram');
  const [captionLength, setCaptionLength] = useState('medium');
  const [colorScheme, setColorScheme] = useState('default');
  const [openSettings, setOpenSettings] = useState(false);
  const fileInputRef = useRef(null);

  const platforms = {
    instagram: { maxLength: 2200, hashtagLimit: 30 },
    twitter: { maxLength: 280, hashtagLimit: 5 },
    facebook: { maxLength: 63206, hashtagLimit: 10 },
    linkedin: { maxLength: 3000, hashtagLimit: 15 }
  };

  const toneOptions = [
    { value: 'professional', label: 'Professional', icon: '👔' },
    { value: 'casual', label: 'Casual', icon: '😊' },
    { value: 'humorous', label: 'Humorous', icon: '😄' },
    { value: 'formal', label: 'Formal', icon: '📜' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'inspirational', label: 'Inspirational', icon: '✨' },
    { value: 'technical', label: 'Technical', icon: '💻' },
    { value: 'storytelling', label: 'Storytelling', icon: '📚' }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    handleImageFile(file);
  };

  const handleImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateContent = async () => {
    setLoading(true);
    try {
      // Generate captions with GPT-4V
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: `Generate ${captionLength === 'short' ? '2-3' : captionLength === 'medium' ? '4-5' : '6-7'} 
                        ${tone} captions for ${selectedPlatform} that would work well with this image. 
                        Additional context: ${description}
                        Maximum length: ${platforms[selectedPlatform].maxLength} characters.
                        Make them engaging and optimized for social media.` 
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });

      const captions = response.choices[0].message.content.split('\n\n');
      setGeneratedCaptions(captions);
      await generateHashtags();
      
      setSnackbar({
        open: true,
        message: 'Content generated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error generating content:', error);
      setSnackbar({
        open: true,
        message: 'Error generating content. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateHashtags = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Generate ${hashtagCount} trending and relevant hashtags for ${selectedPlatform}. 
                      Make them match the ${tone} tone and be highly engaging.
                      Context: ${description}`
          }
        ]
      });

      const hashtags = response.choices[0].message.content
        .split('#')
        .filter(tag => tag.trim())
        .map(tag => tag.trim().replace(/[^a-zA-Z0-9]/g, ''));

      setGeneratedHashtags(hashtags);
    } catch (error) {
      console.error('Error generating hashtags:', error);
    }
  };

  const handleReset = () => {
    setImage(null);
    setImageUrl('');
    setTone('');
    setDescription('');
    setGeneratedCaptions([]);
    setGeneratedHashtags([]);
  };

  const handleCopyContent = (content, type = 'caption') => {
    const hashtagString = generatedHashtags
      .slice(0, hashtagCount)
      .map(tag => `#${tag}`)
      .join(' ');
    
    const fullContent = type === 'caption' 
      ? `${content}\n\n${hashtagString}`
      : hashtagString;

    navigator.clipboard.writeText(fullContent);
    setSnackbar({
      open: true,
      message: `${type === 'caption' ? 'Caption' : 'Hashtags'} copied to clipboard!`,
      severity: 'success'
    });
  };

  const handleShare = async (caption) => {
    try {
      const shareData = {
        title: 'Generated Caption',
        text: `${caption}\n\n${generatedHashtags.slice(0, hashtagCount).map(tag => `#${tag}`).join(' ')}`,
        files: image ? [image] : undefined
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        setSnackbar({
          open: true,
          message: 'Shared successfully!',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Sharing not supported on this device/browser',
          severity: 'warning'
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setSnackbar({
        open: true,
        message: 'Error sharing content',
        severity: 'error'
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
        <Box className="max-w-4xl mx-auto">
          <Typography variant="h3" className="text-center mb-8 text-white font-bold">
            AI Caption Generator
            <AutoAwesome className="ml-2 text-yellow-400" />
          </Typography>

          {/* Upload Section */}
          <Paper 
            elevation={3}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-black/30 backdrop-blur-sm border-2 border-dashed border-purple-300/50 p-8 mb-8 text-center"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            
            {!imageUrl ? (
              <Box className="space-y-4">
                <PhotoCamera sx={{ fontSize: 48 }} className="text-purple-400" />
                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  onClick={() => fileInputRef.current.click()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Upload Image
                </Button>
                <Typography className="text-gray-400">
                  or drag and drop your image here
                </Typography>
              </Box>
            ) : (
              <Box className="relative group">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg shadow-xl"
                />
                <Box className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                  <IconButton
                    onClick={handleReset}
                    className="bg-black/50 text-white hover:bg-black/70"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>

          {/* Settings Dialog */}
          <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
            <DialogTitle>Advanced Settings</DialogTitle>
            <DialogContent>
              <FormControl fullWidth className="mb-4">
                <FormLabel>Caption Length</FormLabel>
                <RadioGroup
                  row
                  value={captionLength}
                  onChange={(e) => setCaptionLength(e.target.value)}
                >
                  <FormControlLabel value="short" control={<Radio />} label="Short" />
                  <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                  <FormControlLabel value="long" control={<Radio />} label="Long" />
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth className="mb-4">
                <FormLabel>Color Scheme</FormLabel>
                <RadioGroup
                  row
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                >
                  <FormControlLabel value="default" control={<Radio />} label="Default" />
                  <FormControlLabel value="vibrant" control={<Radio />} label="Vibrant" />
                  <FormControlLabel value="minimal" control={<Radio />} label="Minimal" />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenSettings(false)}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* Controls Section */}
          <Box className="space-y-6 mb-8">
            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                value={selectedPlatform}
                onChange={(e) => setPlatform(e.target.value)}
                label="Platform"
              >
                {Object.keys(platforms).map((platform) => (
                  <MenuItem key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Tone</InputLabel>
              <Select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                label="Tone"
              >
                {toneOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Context (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any specific details or context you'd like to include..."
            />

            <Box>
              <Typography gutterBottom>
                Number of Hashtags
              </Typography>
              <Slider
                value={hashtagCount}
                onChange={(_, value) => setHashtagCount(value)}
                min={5}
                max={platforms[selectedPlatform].hashtagLimit}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Box>

            <Box className="flex justify-between">
              <Button
                variant="outlined"
                startIcon={<Tune />}
                onClick={() => setOpenSettings(true)}
              >
                Advanced Settings
              </Button>

              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
                onClick={generateContent}
                disabled={!image || !tone || loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {loading ? 'Generating...' : 'Generate Content'}
              </Button>
            </Box>
          </Box>

          {/* Results Section */}
          {(generatedCaptions.length > 0 || generatedHashtags.length > 0) && (
            <Box className="space-y-6">
              {/* Captions */}
              <Typography variant="h6" className="text-white">
                Generated Captions
              </Typography>
              
              {generatedCaptions.map((caption, index) => (
                <Card key={index} className="bg-black/30 backdrop-blur-sm">
                  <CardContent>
                    <Typography className="mb-4">{caption}</Typography>
                    <Box className="flex justify-end space-x-2">
                      <IconButton onClick={() => handleCopyContent(caption)}>
                        <ContentCopy />
                      </IconButton>
                      <IconButton onClick={() => handleShare(caption)}>
                        <Share />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Hashtags */}
              <Typography variant="h6" className="text-white">
                Generated Hashtags
              </Typography>
              
              <Card className="bg-black/30 backdrop-blur-sm">
                <CardContent>
                  <Box className="flex flex-wrap gap-2 mb-4">
                    {generatedHashtags.slice(0, hashtagCount).map((tag, index) => (
                      <Chip
                        key={index}
                        label={`#${tag}`}
                        onClick={() => handleCopyContent(`#${tag}`, 'hashtag')}
                        className="bg-purple-600/50 hover:bg-purple-600/70"
                      />
                    ))}
                  </Box>
                  <Button
                    startIcon={<ContentCopy />}
                    onClick={() => handleCopyContent(null, 'hashtags')}
                    fullWidth
                    variant="outlined"
                  >
                    Copy All Hashtags
                  </Button>
                </CardContent>
              </Card>

              {/* Platform Tips */}
              <Card className="bg-black/30 backdrop-blur-sm">
                <CardContent>
                  <Box className="flex items-center mb-2">
                    <Help className="mr-2 text-purple-400" />
                    <Typography variant="h6" className="text-white">
                      Platform Tips
                    </Typography>
                  </Box>
                  <Typography>
                    {selectedPlatform === 'instagram' && 
                      'For maximum engagement on Instagram, use a mix of popular and niche hashtags. Consider adding hashtags in the first comment rather than the caption.'}
                    {selectedPlatform === 'twitter' && 
                      'Twitter posts with 1-2 relevant hashtags tend to get more engagement than those with more. Place hashtags within the natural flow of your tweet when possible.'}
                    {selectedPlatform === 'facebook' && 
                      'Facebook posts perform best with minimal hashtag usage. Focus on 1-2 highly relevant hashtags that align with your content.'}
                    {selectedPlatform === 'linkedin' && 
                      'Use 3-5 relevant industry hashtags on LinkedIn. Include both broad industry terms and specific niche hashtags for better reach.'}
                  </Typography>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="bg-black/30 backdrop-blur-sm">
                <CardContent>
                  <Typography variant="h6" className="text-white mb-4">
                    Export Options
                  </Typography>
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="outlined"
                      startIcon={<SaveAlt />}
                      onClick={() => {
                        const content = generatedCaptions.join('\n\n') + '\n\n' +
                          generatedHashtags.slice(0, hashtagCount).map(tag => `#${tag}`).join(' ');
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'social-media-content.txt';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Save as Text File
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => {
                        const content = generatedCaptions[0] + '\n\n' +
                          generatedHashtags.slice(0, hashtagCount).map(tag => `#${tag}`).join(' ');
                        if (navigator.share) {
                          navigator.share({
                            title: 'Generated Social Media Content',
                            text: content,
                          });
                        } else {
                          setSnackbar({
                            open: true,
                            message: 'Sharing is not supported on this device/browser',
                            severity: 'warning'
                          });
                        }
                      }}
                    >
                      Share Content
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Quick Actions Fab Buttons */}
          <Box className="fixed bottom-8 right-8 space-y-2">
            <Tooltip title="Customize Appearance" placement="left">
              <IconButton
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setOpenSettings(true)}
              >
                <ColorLens />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adjust Text Size" placement="left">
              <IconButton
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => {
                  // Toggle between text sizes
                  const root = document.documentElement;
                  const currentSize = getComputedStyle(root).fontSize;
                  root.style.fontSize = currentSize === '16px' ? '18px' : '16px';
                }}
              >
                <FormatSize />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              severity={snackbar.severity}
              variant="filled"
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CaptionGenerator;