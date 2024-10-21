import React, { useState, useEffect } from 'react';
import { 
  TextField, Switch, Button, Card, CardContent, Typography, 
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Slider, FormControlLabel, Tooltip, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  MusicNote, PlayArrow, Pause, SkipPrevious, SkipNext, 
  VolumeUp, Favorite, FavoriteBorder, Refresh
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const GradientBackground = styled('div')({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #111827, #4C1D95, #111827)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
});

const ContentContainer = styled('div')({
  display: 'flex',
  flex: 1,
  padding: '2rem',
  gap: '2rem',
});

const LeftColumn = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const RightColumn = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const StyledCard = styled(Card)({
  background: 'rgba(31, 41, 55, 0.7)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  marginBottom: '1rem',
});

const SongCreationPage = () => {
  const [description, setDescription] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState([]);
  const [volume, setVolume] = useState(50);
  const [mood, setMood] = useState('happy');
  const [tempo, setTempo] = useState(120);
  const [favorites, setFavorites] = useState([]);

  const ideas = [
    { title: 'Person', description: 'Make a song about your mom, partner, best friend, or anyone else in your life.' },
    { title: 'Special Occasions', description: 'Make a song to celebrate a birthday, holiday, or other special life events.' },
    { title: 'Activity', description: 'Make a song to jam to at your next group hangout or party.' },
    { title: 'Greeting', description: 'Make a song to say thank you, congratulations, or get well soon.' },
    { title: 'Vacation', description: 'Make a song to get excited for your next fun trip.' },
    { title: 'Scrapbook', description: 'Make a song to commemorate your most treasured memories.' },
    { title: 'Pet', description: 'Make a song to celebrate how cute and quirky your pet is.' },
  ];

  const handleCreate = () => {
    const newSong = {
      id: Date.now(),
      title: `Generated Song ${generatedSongs.length + 1}`,
      artist: 'AI Artist',
      imageUrl: `https://picsum.photos/100/100?random=${Date.now()}`,
      mood,
      tempo,
      isInstrumental,
    };
    setGeneratedSongs([newSong, ...generatedSongs]);
    setCurrentSong(newSong);
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
  };

  const toggleFavorite = (songId) => {
    setFavorites(prev => 
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  };

  const handleRegenerate = () => {
    if (currentSong) {
      const updatedSong = { ...currentSong, imageUrl: `https://picsum.photos/100/100?random=${Date.now()}` };
      setGeneratedSongs(prev => prev.map(song => song.id === currentSong.id ? updatedSong : song));
      setCurrentSong(updatedSong);
    }
  };

  useEffect(() => {
    // Simulating song playing when isPlaying changes
    if (isPlaying) {
      console.log(`Playing ${currentSong.title} at volume ${volume}`);
    } else {
      console.log('Paused');
    }
  }, [isPlaying, currentSong, volume]);

  return (
    <GradientBackground>
      <ContentContainer>
        <LeftColumn>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" gutterBottom>Create a Song</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="a syncopated hip hop song about dancing with you for the last time"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Switch checked={isInstrumental} onChange={() => setIsInstrumental(!isInstrumental)} />}
                label="Instrumental"
              />
              <Typography gutterBottom>Mood</Typography>
              <Slider
                value={mood === 'happy' ? 100 : 0}
                onChange={(e, value) => setMood(value > 50 ? 'happy' : 'sad')}
                valueLabelDisplay="auto"
                valueLabelFormat={value => value > 50 ? 'Happy' : 'Sad'}
              />
              <Typography gutterBottom>Tempo: {tempo} BPM</Typography>
              <Slider
                value={tempo}
                onChange={(e, value) => setTempo(value)}
                min={60}
                max={180}
                valueLabelDisplay="auto"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<MusicNote />}
                onClick={handleCreate}
                fullWidth
                sx={{ mt: 2 }}
              >
                Create
              </Button>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>Need ideas?</Typography>
              <List>
                {ideas.map((idea, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={idea.title} secondary={idea.description} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </LeftColumn>

        <RightColumn>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>Generated Songs</Typography>
              <List>
                {generatedSongs.map((song) => (
                  <ListItem key={song.id}>
                    <img src={song.imageUrl} alt={song.title} style={{ width: 50, height: 50, marginRight: 16 }} />
                    <ListItemText 
                      primary={song.title} 
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textSecondary">
                            {song.artist}
                          </Typography>
                          <br />
                          <Chip label={song.mood} size="small" />
                          <Chip label={`${song.tempo} BPM`} size="small" />
                          {song.isInstrumental && <Chip label="Instrumental" size="small" />}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => toggleFavorite(song.id)}>
                        {favorites.includes(song.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                      </IconButton>
                      <IconButton edge="end" onClick={() => {
                        setCurrentSong(song);
                        setIsPlaying(true);
                      }}>
                        <PlayArrow />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </RightColumn>
      </ContentContainer>

      {currentSong && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={currentSong.imageUrl} alt={currentSong.title} style={{ width: 50, height: 50, marginRight: 16 }} />
            <div>
              <Typography variant="subtitle1">{currentSong.title}</Typography>
              <Typography variant="body2" color="textSecondary">{currentSong.artist}</Typography>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handlePrevious} color="inherit">
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handlePlayPause} color="inherit">
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={handleNext} color="inherit">
              <SkipNext />
            </IconButton>
            <Tooltip title="Regenerate">
              <IconButton onClick={handleRegenerate} color="inherit">
                <Refresh />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: 200 }}>
            <VolumeUp />
            <Slider value={volume} onChange={handleVolumeChange} aria-labelledby="continuous-slider" />
          </div>
        </motion.div>
      )}
    </GradientBackground>
  );
};

export default SongCreationPage;