import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Slider,
  Stack,
  CircularProgress,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  Tooltip,
  Container
} from '@mui/material';
import {
  MusicNote,
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  VolumeOff,
  Info,
  LibraryMusic,
  Refresh
} from '@mui/icons-material';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 8,
            height: 48,
            '&.MuiFilledInput-multiline': {
              height: 'auto',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 12
        }
      }
    }
  }
});

const musicGenres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 
  'Classical', 'Electronic', 'Country', 'Folk', 'Blues',
  'Metal', 'Reggae', 'Latin', 'Indie', 'Soul',
  'Funk', 'Disco', 'House', 'Techno', 'Gospel'
];

const generateSong = async (songData) => {
  try {
    const response = await fetch('https://api.topmediai.com/v1/music', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_auto: songData.isInstrumental ? 1 : 0,
        prompt: songData.styles.join(', '),
        lyrics: songData.isInstrumental ? '' : songData.lyrics,
        title: songData.title,
        instrumental: songData.isInstrumental ? 1 : 0
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      id: Date.now(),
      title: songData.title,
      styles: songData.styles,
      audio: result,
      duration: '0:00',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating song:', error);
    throw new Error('Failed to generate song. Please try again.');
  }
};

const CustomSongGenerator = () => {
  // State management
  const [formData, setFormData] = useState({
    lyrics: '',
    title: '',
    styles: []
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Handle genre selection
  const handleGenreSelect = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    setFormData({ ...formData, styles: updatedGenres });
  };

  // Handle song generation
  const handleGenerate = async () => {
    if (!formData.title.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a title for your song',
        severity: 'warning'
      });
      return;
    }

    if (!isInstrumental && !formData.lyrics.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter lyrics or enable instrumental mode',
        severity: 'warning'
      });
      return;
    }

    if (formData.styles.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please select at least one music style',
        severity: 'warning'
      });
      return;
    }

    setIsLoading(true);
    try {
      const newSong = await generateSong({
        ...formData,
        isInstrumental
      });
      
      setGeneratedSongs(prevSongs => [newSong, ...prevSongs]);
      setCurrentSong(newSong);
      setIsPlaying(true);
      setSnackbar({
        open: true,
        message: 'Song generated successfully!',
        severity: 'success'
      });

      if (isInstrumental) {
        setFormData(prev => ({
          ...prev,
          lyrics: ''
        }));
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to generate song. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Audio player controls
  useEffect(() => {
    if (currentSong && currentSong.audio) {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.src = currentSong.audio;
      } else {
        const player = new Audio(currentSong.audio);
        player.addEventListener('timeupdate', () => {
          setCurrentTime(player.currentTime);
        });
        player.addEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });
        setAudioPlayer(player);
      }
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.removeEventListener('timeupdate', () => {});
        audioPlayer.removeEventListener('ended', () => {});
      }
    };
  }, [currentSong]);

  useEffect(() => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Genre scroller component
  const GenreScroller = () => (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': {
          height: 6
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 3
        }
      }}
    >
      {musicGenres.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          onClick={() => handleGenreSelect(genre)}
          color={selectedGenres.includes(genre) ? "primary" : "default"}
          sx={{
            height: 32,
            borderRadius: 16,
            backgroundColor: selectedGenres.includes(genre)
              ? 'primary.main'
              : 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: selectedGenres.includes(genre)
                ? 'primary.dark'
                : 'rgba(255, 255, 255, 0.08)'
            }
          }}
        />
      ))}
    </Box>
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(0deg, #111827 0%, #581C8B 50%, #111827 100%)',
          fontFamily: "'Poppins', sans-serif",
          color: 'white',
          pt: 8, // Added more top padding
          pb: 10
        }}
      >
        <Container maxWidth="xl">
          {/* Added Main Heading */}
          <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Custom Song Generator
          </Typography>

          <Grid container spacing={4}>
            {/* Form Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
                <CardContent>
                  {/* Title Section */}
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Typography variant="body1" color="textSecondary">
                        Title
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography variant="caption" color="textSecondary">
                        {formData.title.length} / 80
                      </Typography>
                    </Stack>
                    <TextField
                      fullWidth
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value.slice(0, 80) })}
                      placeholder="Enter song title"
                      variant="filled"
                      size="small"
                    />
                  </Box>

                  {/* Genre Section */}
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Typography variant="body1" color="textSecondary">
                        Style of Music
                      </Typography>
                      <Tooltip title="Select one or more genres">
                        <IconButton size="small">
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <GenreScroller />
                    <TextField
                      fullWidth
                      value={selectedGenres.join(', ')}
                      placeholder="Selected genres will appear here"
                      variant="filled"
                      size="small"
                      InputProps={{ readOnly: true }}
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  {/* Lyrics Section */}
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Typography variant="body1" color="textSecondary">
                        Lyrics
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isInstrumental}
                            onChange={(e) => setIsInstrumental(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Instrumental"
                        sx={{ ml: 'auto' }}
                      />
                    </Stack>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      value={formData.lyrics}
                      onChange={(e) => setFormData({ ...formData, lyrics: e.target.value.slice(0, 3000) })}
                      placeholder="Enter your lyrics or describe the song"
                      variant="filled"
                      disabled={isInstrumental}
                    />
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                      {formData.lyrics.length} / 3000
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    sx={{
                      height: 48,
                      background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
                      fontWeight: 600
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        <LibraryMusic sx={{ mr: 1 }} />
                        Generate Song
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Generated Songs Section */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Generated Songs
                  </Typography>
                  <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                    {generatedSongs.map((song, index) => (
                      <Card
                        key={song.id}
                        sx={{
                          mb: 2,
                          bgcolor: 'background.default',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 1,
                              bgcolor: 'primary.dark',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2
                            }}
                          >
                            <MusicNote />
                          </Box>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">{song.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {song.styles.join(', ')}
                            </Typography>
                          </Box>
                          <IconButton
                            onClick={() => {
                              if (currentSong?.id === song.id) {
                                setIsPlaying(!isPlaying);
                              } else {
                                setCurrentSong(song);
                                setIsPlaying(true);
                              }
                            }}
                          >
                            {currentSong?.id === song.id && isPlaying ? <Pause /> : <PlayArrow />}
                          </IconButton>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Player Bar */}
        {currentSong && (
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              bgcolor: 'background.paper',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              zIndex: 1000
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: 'primary.dark',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MusicNote />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" noWrap>
                      {currentSong.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {currentSong.styles.join(', ')}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <IconButton
                    size="small"
                    onClick={() => {
                      const currentIndex = generatedSongs.findIndex(song => song.id === currentSong.id);
                      if (currentIndex > 0) {
                        setCurrentSong(generatedSongs[currentIndex - 1]);
                        setIsPlaying(true);
                      }
                    }}
                    disabled={generatedSongs.findIndex(song => song.id === currentSong.id) === 0}
                  >
                    <SkipPrevious />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const currentIndex = generatedSongs.findIndex(song => song.id === currentSong.id);
                      if (currentIndex < generatedSongs.length - 1) {
                        setCurrentSong(generatedSongs[currentIndex + 1]);
                        setIsPlaying(true);
                      }
                    }}
                    disabled={generatedSongs.findIndex(song => song.id === currentSong.id) === generatedSongs.length - 1}
                  >
                    <SkipNext />
                  </IconButton>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(currentTime)}
                  </Typography>
                  <Slider
                    size="small"
                    value={currentTime}
                    max={audioPlayer?.duration || 0}
                    onChange={(_, value) => {
                      if (audioPlayer) {
                        audioPlayer.currentTime = value;
                        setCurrentTime(value);
                      }
                    }}
                    sx={{ width: '60%' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {audioPlayer?.duration ? formatTime(audioPlayer.duration) : '0:00'}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                  <IconButton size="small" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeOff /> : <VolumeUp />}
                  </IconButton>
                  <Slider
                    size="small"
                    value={isMuted ? 0 : volume}
                    onChange={(_, newValue) => {
                      setVolume(newValue);
                      setIsMuted(false);
                    }}
                    sx={{
                      width: 100,
                      '& .MuiSlider-thumb': {
                        width: 12,
                        height: 12
                      }
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: 20
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default CustomSongGenerator;