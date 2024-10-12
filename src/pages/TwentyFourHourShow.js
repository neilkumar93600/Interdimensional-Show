import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
  Button, IconButton, Badge, Slider, TextField, Avatar, List,
  ListItem, ListItemText, ListItemAvatar, Chip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import {
  Mic as MicIcon,
  MusicNote as MusicNoteIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  VolumeUp as VolumeUpIcon,
  Send as SendIcon,
  CalendarToday as CalendarTodayIcon,
  BookOnline as BookOnlineIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Public as PublicIcon
} from '@mui/icons-material';
import { ChakraProvider, Box, Flex, Image } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(4px)',
          background: 'rgba(17, 34, 64, 0.8)',
        },
      },
    },
  },
});

const INITIAL_STATE = {
  streams: {
    comedy: {
      title: 'Comedy 24/7',
      activeUsers: 324,
      isLive: true,
      currentShow: {
        title: 'Stand-up Hour',
        host: 'John Smith',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        description: 'Non-stop laughter with our top comedians!',
        viewers: 324,
        likes: 1245,
        shares: 387,
        videoUrl: 'https://example.com/comedy-stream.mp4'
      },
      upNext: {
        title: 'Comedy Central',
        host: 'Sarah Johnson',
        startTime: '11:00 AM',
        trailerUrl: 'https://example.com/comedy-central-trailer.mp4'
      },
      chatMessages: [
        { id: 1, user: 'ComedyFan123', message: 'This show is hilarious! 😂', timestamp: '10:15 AM' },
        { id: 2, user: 'LaughTracker', message: "Can't stop laughing!", timestamp: '10:16 AM' },
        { id: 3, user: 'JokesMaster', message: 'The host is on fire today! 🔥', timestamp: '10:18 AM' }
      ]
    },
    music: {
      title: 'Music 24/7',
      activeUsers: 567,
      isLive: true,
      currentShow: {
        title: 'Morning Beats',
        host: 'DJ Mike',
        startTime: '9:00 AM',
        endTime: '12:00 PM',
        description: 'Wake up to the best beats in town!',
        viewers: 567,
        likes: 2389,
        shares: 942,
        videoUrl: 'https://example.com/music-stream.mp4'
      },
      upNext: {
        title: 'Jazz Hour',
        host: 'The Smooth Quartet',
        startTime: '12:00 PM',
        trailerUrl: 'https://example.com/jazz-hour-trailer.mp4'
      },
      chatMessages: [
        { id: 1, user: 'MusicLover', message: '🎵 This track is fire!', timestamp: '9:15 AM' },
        { id: 2, user: 'BeatMaster', message: 'Perfect vibes for working', timestamp: '9:17 AM' },
        { id: 3, user: 'RhythmKing', message: 'DJ Mike never disappoints! 🎧', timestamp: '9:20 AM' }
      ]
    }
  }
};

const viewerData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  viewers: Math.floor(Math.random() * 1000) + 200,
}));

const VideoPlayer = ({ stream, isPlaying, onPlayPause, volume, onVolumeChange }) => {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={stream.currentShow.videoUrl}
        playsInline
        autoPlay
        muted
        loop
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center space-x-4">
          <IconButton onClick={onPlayPause} className="text-white">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <div className="flex-1">
            <Slider
              value={50}
              onChange={(_, newValue) => {}}
              className="text-cyan-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <VolumeUpIcon className="text-white" />
            <Slider
              value={volume}
              onChange={onVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = ({ nextEventTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(nextEventTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-2xl font-bold text-cyan-400">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

const EntertainmentHub = () => {
  const [streams, setStreams] = useState(INITIAL_STATE.streams);
  const [activeTab, setActiveTab] = useState('comedy');
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [showGlobalMap, setShowGlobalMap] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
  };

  const currentStream = streams[activeTab];

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h5" className="flex-grow font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                24/7 Entertainment Hub
              </Typography>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PublicIcon />}
                  onClick={() => setShowGlobalMap(!showGlobalMap)}
                >
                  Global View
                </Button>
              </div>
            </Toolbar>
          </AppBar>

          <Container maxWidth="xl" className="py-8">
            <Grid container spacing={4}>
              {/* Main Content */}
              <Grid item xs={12} lg={8}>
                <Card>
                  <CardContent>
                    <VideoPlayer
                      stream={currentStream}
                      isPlaying={isPlaying}
                      onPlayPause={() => setIsPlaying(!isPlaying)}
                      volume={volume}
                      onVolumeChange={handleVolumeChange}
                    />
                    
                    <div className="mt-4 flex justify-between items-start">
                      <div>
                        <Typography variant="h6" className="text-white">
                          {currentStream.currentShow.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Hosted by {currentStream.currentShow.host}
                        </Typography>
                        <div className="flex items-center space-x-2 mt-2">
                          <Chip
                            icon={<PersonIcon />}
                            label={`${currentStream.activeUsers} watching`}
                            variant="outlined"
                            color="primary"
                            size="small"
                          />
                          <Chip
                            label="LIVE"
                            color="error"
                            size="small"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <IconButton>
                          <Badge badgeContent={currentStream.currentShow.likes} color="primary">
                            <FavoriteIcon />
                          </Badge>
                        </IconButton>
                        <IconButton>
                          <Badge badgeContent={currentStream.currentShow.shares} color="secondary">
                            <ShareIcon />
                          </Badge>
                        </IconButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Schedule */}
                <Card className="mt-4">
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      24/7 Schedule
                    </Typography>
                    <div className="flex space-x-2 overflow-x-auto pb-4">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 w-32 h-24 bg-gray-800 rounded-lg p-2 cursor-pointer hover:bg-gray-700 transition-colors"
                          onClick={() => {
                            setSelectedShow({
                              title: `Show at ${i}:00`,
                              description: `This is the show scheduled for ${i}:00.`,
                              preview: 'https://example.com/show-preview.mp4'
                            });
                            setOpenDialog(true);
                          }}
                        >
                          <Typography variant="body2" className="text-white font-bold">
                            {i}:00
                          </Typography>
                          <Typography variant="caption" className="text-gray-400">
                            Show Title
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={12} lg={4}>
                {/* Countdown Timer */}
                <Card className="mb-4">
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      Next Event Countdown
                    </Typography>
                    <CountdownTimer nextEventTime="2023-06-01T00:00:00" />
                  </CardContent>
                </Card>

                {/* Up Next */}
                <Card className="mb-4">
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      Up Next
                    </Typography>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-24 h-16 bg-gray-800 rounded-lg overflow-hidden">
                        <video
                          src={currentStream.upNext.trailerUrl}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                        />
                      </div>
                      <div>
                        <Typography variant="subtitle1" className="text-white">
                          {currentStream.upNext.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {currentStream.upNext.host}
                        </Typography>
                        <Typography variant="body2" className="text-cyan-400">
                          Starts at {currentStream.upNext.startTime}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Chat */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      Live Chat
                    </Typography>
                    <List className="h-64 overflow-y-auto mb-4">
                      {currentStream.chatMessages.map((message) => (
                        <ListItem key={message.id}>
                          <ListItemAvatar>
                            <Avatar>{message.user[0]}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={message.user}
                            secondary={message.message}
                            secondaryTypographyProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <div className="flex space-x-2">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Type a message..."
                        className="bg-black/20"
                      />
                      <IconButton color="primary">
                        <SendIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>

                {/* Global Audience Map */}
                {showGlobalMap && (
                  <Card className="mt-4">
                    <CardContent>
                      <Typography variant="h6" className="text-cyan-400 mb-4">
                        Global Audience
                      </Typography>
                      <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
                        <Typography variant="body1" color="textSecondary">
                          Interactive global audience map would render here
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Show Details Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                  <DialogTitle>{selectedShow?.title}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {selectedShow?.description}
                    </DialogContentText>
                    {selectedShow?.preview && (
                      <video
                        src={selectedShow.preview}
                        className="w-full mt-4"
                        controls
                      />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                      Set Reminder
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* Song/Show Request Feature */}
                <Card className="mt-4">
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      Request a Song/Show
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Enter your request..."
                      className="mb-2"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit Request
                    </Button>
                  </CardContent>
                </Card>

                {/* Customizable Stream */}
                <Card className="mt-4">
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      Customize Your Stream
                    </Typography>
                    <div className="flex space-x-2">
                      <Button variant="outlined" size="small">Upbeat</Button>
                      <Button variant="outlined" size="small">Chill</Button>
                      <Button variant="outlined" size="small">Funny</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Join the Show Feature */}
                <Card className="mt-4">
                  <CardContent>
                    <Typography variant="h6" className="text-cyan-400 mb-4">
                      Join the Show
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Submit a question or joke..."
                      className="mb-2"
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </CardContent>
                </Card>

              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default EntertainmentHub;