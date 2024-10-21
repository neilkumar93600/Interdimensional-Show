import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
  CardMedia, Button, IconButton, Badge, Slider, TextField, Avatar, List,
  ListItem, ListItemText, ListItemAvatar,  Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import {Person as PersonIcon,
  Favorite as FavoriteIcon, Share as ShareIcon, VolumeUp as VolumeUpIcon,
  Send as SendIcon, CalendarToday as CalendarTodayIcon,
  BookOnline as BookOnlineIcon,
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#61dafb',
    },
    secondary: {
      main: '#ff6b6b',
    },
  },
});

const formatCountdown = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const StreamSection = ({ type, stream }) => (
  <Card className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl shadow-2xl backdrop-blur-lg">
    <CardContent>
      <Typography variant="h5" className="mb-4 text-cyan-300">
        {type === 'comedy' ? 'Live Comedy Show' : 'Live Music Stream'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="video"
            src={stream.videoUrl}
            controls
            className="rounded-xl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="text-pink-300">
            {stream.title}
          </Typography>
          <Typography variant="subtitle1">Host: {stream.host}</Typography>
          <div className="flex items-center mt-2">
            <IconButton color="secondary">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="primary">
              <ShareIcon />
            </IconButton>
            <IconButton>
              <Badge badgeContent={stream.listeners} color="secondary">
                <VolumeUpIcon />
              </Badge>
            </IconButton>
          </div>
          <Slider
            defaultValue={50}
            aria-label="Volume"
            valueLabelDisplay="auto"
            className="mt-4"
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const EntertainmentHub = () => {
  const [countdown, setCountdown] = useState(3600);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 3600
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenDialog = (show) => {
    setSelectedShow(show);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddToCalendar = () => {
    // Add to calendar logic here
    handleCloseDialog();
  };

  const handleBookShow = () => {
    // Book show logic here
    handleCloseDialog();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { text: newMessage, user: 'You' }]);
      setNewMessage('');
    }
  };

  const streams = {
    comedy: {
      title: 'Laugh Factory Live',
      host: 'Jane Doe',
      videoUrl: 'https://example.com/comedy-stream',
      listeners: 1500,
    },
    music: {
      title: 'Late Night Jazz',
      host: 'John Smith',
      videoUrl: 'https://example.com/music-stream',
      listeners: 2000,
    },
  };

  const upcomingShows = [
    { id: 1, title: 'Stand-up Special', host: 'Mike Johnson', date: '2024-10-20', time: '20:00' },
    { id: 2, title: 'Live Concert', host: 'The Rockers', date: '2024-10-21', time: '21:00' },
    { id: 3, title: 'Comedy Roast', host: 'Sarah Williams', date: '2024-10-22', time: '19:30' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" className="flex-grow text-cyan-300">
              24/7 Entertainment Hub
            </Typography>
            <Typography variant="h6" className="animate-pulse text-pink-300">
              Next show in: {formatCountdown(countdown)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className="py-8">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <StreamSection type="comedy" stream={streams.comedy} />
            </Grid>
            <Grid item xs={12}>
              <StreamSection type="music" stream={streams.music} />
            </Grid>
            <Grid item xs={12}>
              <Card className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl shadow-2xl backdrop-blur-lg">
                <CardContent>
                  <Typography variant="h5" className="mb-4 text-cyan-300">Upcoming Shows</Typography>
                  <Grid container spacing={2}>
                    {upcomingShows.map((show) => (
                      <Grid item xs={12} sm={6} md={4} key={show.id}>
                        <Card className="bg-black bg-opacity-30 rounded-xl">
                          <CardContent>
                            <Typography variant="h6" className="text-pink-300">{show.title}</Typography>
                            <Typography variant="body2">Host: {show.host}</Typography>
                            <Typography variant="body2">Date: {show.date}</Typography>
                            <Typography variant="body2">Time: {show.time}</Typography>
                            <Button
                              variant="outlined"
                              color="secondary"
                              startIcon={<CalendarTodayIcon />}
                              onClick={() => handleOpenDialog(show)}
                              className="mt-2"
                            >
                              Add to Calendar
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl shadow-2xl backdrop-blur-lg">
                <CardContent>
                  <Typography variant="h5" className="mb-4 text-cyan-300">Live Chat</Typography>
                  <List>
                    {chatMessages.map((message, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={message.user} secondary={message.text} />
                      </ListItem>
                    ))}
                  </List>
                  <div className="flex mt-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <IconButton color="primary" onClick={handleSendMessage}>
                      <SendIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle className="bg-gradient-to-r from-blue-800 to-purple-800 text-cyan-300">
            {selectedShow?.title}
          </DialogTitle>
          <DialogContent className="bg-gradient-to-r from-blue-900 to-purple-900">
            <DialogContentText className="text-gray-300">
              Would you like to add this show to your calendar or book it now?
            </DialogContentText>
            <Typography variant="body1" className="mt-4 text-pink-300">
              Host: {selectedShow?.host}
            </Typography>
            <Typography variant="body1" className="text-pink-300">
              Date: {selectedShow?.date}
            </Typography>
            <Typography variant="body1" className="text-pink-300">
              Time: {selectedShow?.time}
            </Typography>
          </DialogContent>
          <DialogActions className="bg-gradient-to-r from-blue-900 to-purple-900">
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddToCalendar} color="secondary" startIcon={<CalendarTodayIcon />}>
              Add to Calendar
            </Button>
            <Button onClick={handleBookShow} color="secondary" variant="contained" startIcon={<BookOnlineIcon />}>
              Book Now
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default EntertainmentHub;