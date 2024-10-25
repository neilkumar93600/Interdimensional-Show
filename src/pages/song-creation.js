import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronLeft} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TextField, 
  Button,
  Slider, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
      paper: '#1E1E1E',
    },
  },
});

// Simulated API call for song creation
const createSong = async (songData) => {
  // In a real implementation, this would be an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        title: `Song for ${songData.name}`,
        artist: 'AI Artist',
        imageUrl: `https://picsum.photos/100/100?random=${Date.now()}`,
        genre: songData.genre,
      });
    }, 2000); // Simulating a 2-second API call
  });
};

const SongCreationPage = () => {
  const [description, setDescription] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState([]);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [activeIdea, setActiveIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    favoriteThing: '',
    funniestThing: '',
    genre: ''
  });

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const songData = activeIdea ? formData : { description };
      const newSong = await createSong(songData);
      setGeneratedSongs([newSong, ...generatedSongs]);
      setCurrentSong(newSong);
      setIsPlaying(true);
      setSnackbar({ open: true, message: 'Song created successfully!', severity: 'success' });
      setActiveIdea(null); // Reset to main view after creation
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create song. Please try again.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handlePrevious = () => {
    const currentIndex = generatedSongs.findIndex(song => song.id === currentSong.id);
    if (currentIndex > 0) {
      setCurrentSong(generatedSongs[currentIndex - 1]);
    }
  };
  const handleNext = () => {
    const currentIndex = generatedSongs.findIndex(song => song.id === currentSong.id);
    if (currentIndex < generatedSongs.length - 1) {
      setCurrentSong(generatedSongs[currentIndex + 1]);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ideas = [
    { icon: '👤', title: 'Person', description: 'Celebrate a special person in your life' },
    { icon: '🎉', title: 'Special Occasions', description: 'Mark a birthday, holiday, or life event' },
    { icon: '🎵', title: 'Activity', description: 'Create a jam for your next hangout or party' },
    { icon: '💌', title: 'Greeting', description: 'Say thank you, congrats, or get well soon' },
    { icon: '✈️', title: 'Vacation', description: 'Get excited for your next fun trip' },
    { icon: '📸', title: 'Scrapbook', description: 'Commemorate your treasured memories' },
    { icon: '🐾', title: 'Pet', description: 'Celebrate your cute and quirky pet' },
  ];

  const renderIdeaForm = () => (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Let's make a song to {activeIdea.description.toLowerCase()}
      </Typography>
      <TextField
        fullWidth
        label="I'm celebrating"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
        variant="filled"
        margin="normal"
        InputProps={{
          endAdornment: <Typography color="textSecondary">NAME OF PERSON</Typography>,
        }}
      />
      <TextField
        fullWidth
        label="My"
        name="relationship"
        value={formData.relationship}
        onChange={handleFormChange}
        variant="filled"
        margin="normal"
        InputProps={{
          endAdornment: <Typography color="textSecondary">RELATIONSHIP TO PERSON</Typography>,
        }}
      />
      <TextField
        fullWidth
        label="My favorite thing about them is"
        name="favoriteThing"
        value={formData.favoriteThing}
        onChange={handleFormChange}
        variant="filled"
        margin="normal"
        InputProps={{
          endAdornment: <Typography color="textSecondary">FAVORITE THING ABOUT THEM</Typography>,
        }}
      />
      <TextField
        fullWidth
        label="and the funniest thing about them is"
        name="funniestThing"
        value={formData.funniestThing}
        onChange={handleFormChange}
        variant="filled"
        margin="normal"
        InputProps={{
          endAdornment: <Typography color="textSecondary">FUNNIEST THING ABOUT THEM</Typography>,
        }}
      />
      <TextField
        fullWidth
        label="Their favorite genre of music is"
        name="genre"
        value={formData.genre}
        onChange={handleFormChange}
        variant="filled"
        margin="normal"
        InputProps={{
          endAdornment: <Typography color="textSecondary">GENRE</Typography>,
        }}
      />
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box 
        className="min-h-screen flex" 
        sx={{
          background: 'linear-gradient(to bottom, #121212, #2a0845, #121212)',
          color: 'white',
        }}
      >
        {/* Left side - Form and Ideas */}
        <Box className="w-1/2 p-8 flex flex-col" sx={{ mt: 10, p:7 }}>
          <AnimatePresence mode="wait">
            {!activeIdea ? (
              <motion.div
                key="main-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Typography variant="h3" component="h1" gutterBottom>
                  Create a Song
                </Typography>
                <Box className="mb-6 flex-grow">
                  <TextField
                    fullWidth
                    multiline
                    rows={7}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Song description"
                    variant="filled"
                    placeholder="a syncopated hip hop song about dancing with you for the last time"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" align="right" display="block">
                    {description.length} / 200
                  </Typography>
                </Box>
                
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCreate}
                  startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <Music />}
                  disabled={isLoading}
                  sx={{ mb: 6, height: 56, fontSize: '1.2rem' }}
                >
                  {isLoading ? 'Creating...' : 'Create'}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="idea-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button startIcon={<ChevronLeft />} onClick={() => setActiveIdea(null)} sx={{ mb: 2 }}>
                  Back to ideas
                </Button>
                {renderIdeaForm()}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCreate}
                  startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <Music />}
                  disabled={isLoading}
                  sx={{ mt: 4, height: 56, fontSize: '1.2rem' }}
                >
                  {isLoading ? 'Creating...' : 'Create'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Need ideas section */}
          <Box className="mt-auto" sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Need ideas?
            </Typography>
            <List>
              {ideas.map((idea, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    button 
                    onClick={() => setActiveIdea(idea)}
                    sx={{ 
                      borderRadius: 1, 
                      mb: 1,
                      '&:hover': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    <ListItemIcon>{idea.icon}</ListItemIcon>
                    <ListItemText 
                      primary={idea.title} 
                      secondary={idea.description}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                  {index < ideas.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Box>

        {/* Right side - Generated Songs */}
        <Box className="w-1/2 p-8" sx={{ bgcolor: 'rgba(18, 18, 18, 0.8)' }}>
          <Typography variant="h4" gutterBottom>
            Generated Songs
          </Typography>
          <Box className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
            {generatedSongs.map((song) => (
              <Card key={song.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, bgcolor: 'background.paper' }}>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                  <img src={song.imageUrl} alt={song.title} className="w-16 h-16 mr-4 rounded" />
                  <Box>
                    <Typography component="h5" variant="h6">
                      {song.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {song.artist}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Genre: {song.genre}
                    </Typography>
                  </Box>
                </CardContent>
                <IconButton 
                  onClick={() => {
                    setCurrentSong(song);
                    setIsPlaying(true);
                  }}
                >
                  <Play />
                </IconButton>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Music Player */}
        {currentSong && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 text-white p-4 flex items-center justify-between z-50"
            style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)' }}
          >
            <Box className="flex items-center">
              <img src={currentSong.imageUrl} alt={currentSong.title} className="w-12 h-12 mr-4 rounded" />
              <Box>
                <Typography variant="subtitle1">{currentSong.title}</Typography>
                <Typography variant="body2" color="text.secondary">{currentSong.artist}</Typography>
              </Box>
            </Box>
            <Box className="flex items-center space-x-4">
              <IconButton onClick={handlePrevious} color="inherit"><SkipBack /></IconButton>
              <IconButton onClick={handlePlayPause} color="inherit">
                {isPlaying ? <Pause /> : <Play />}
              </IconButton>
              <IconButton onClick={handleNext} color="inherit"><SkipForward /></IconButton>
            </Box>
            <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleMute} color="inherit">
                {isMuted ? <VolumeX /> : <Volume2 />}
              </IconButton>
              <Slider
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-labelledby="continuous-slider"
                sx={{ ml: 2 }}
              />
            </Box>
          </motion.div>
        )}

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default SongCreationPage;