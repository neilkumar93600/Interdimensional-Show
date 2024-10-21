import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box,
  Container,
  Paper,
  Typography,
  Slider,
  Button,
  IconButton,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  CloudUpload,
  Save,
  Settings,
  ArrowBack,
  Refresh,
  AutoFixHigh,
  LibraryMusic,
  Timer
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const WaveformCanvas = styled('canvas')({
  width: '100%',
  height: '120px',
  background: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  marginTop: '8px',
  marginBottom: '8px'
});

const EffectPresets = {
  CLASSIC_LOFI: {
    name: 'Classic LoFi',
    settings: {
      tempo: 85,
      filterFreq: 2000,
      reverbMix: 0.3,
      bitDepth: 12,
      vinylNoise: -25,
      compression: -15,
      wobble: 0.2,
      saturation: 0.3
    }
  },
  VINYL_HEAVY: {
    name: 'Vinyl Heavy',
    settings: {
      tempo: 80,
      filterFreq: 1800,
      reverbMix: 0.4,
      bitDepth: 10,
      vinylNoise: -15,
      compression: -20,
      wobble: 0.4,
      saturation: 0.5
    }
  },
  TAPE_WARM: {
    name: 'Tape Warmth',
    settings: {
      tempo: 90,
      filterFreq: 2200,
      reverbMix: 0.25,
      bitDepth: 14,
      vinylNoise: -30,
      compression: -12,
      wobble: 0.15,
      saturation: 0.6
    }
  }
};

// Real-time waveform visualization component
const VisualizeAudio = ({ audioBuffer, isPlaying, currentTime }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const data = audioBuffer.getChannelData(0);
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const amp = height / 2;
      
      // Draw background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;

      const step = Math.ceil(data.length / width);
      const playbackPosition = (currentTime * audioBuffer.sampleRate) / step;

      for (let i = 0; i < width; i++) {
        let min = 1.0;
        let max = -1.0;
        
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j] || 0;
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }

        // Add gradient coloring based on playback position
        if (i < playbackPosition) {
          ctx.strokeStyle = '#a855f7';
        } else {
          ctx.strokeStyle = '#8b5cf6';
        }

        ctx.moveTo(i, (1 + min) * amp);
        ctx.lineTo(i, (1 + max) * amp);
        ctx.stroke();
      }
    };

    if (isPlaying) {
      const animate = () => {
        draw();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      draw();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioBuffer, isPlaying, currentTime]);

  return <WaveformCanvas ref={canvasRef} />;
};

// Main Component
const LoFiPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ setSelectedPreset] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [autoPlay, setAutoPlay] = useState(false);
  const [settings, setSettings] = useState({
    tempo: 85,
    filterFreq: 2000,
    reverbMix: 0.3,
    bitDepth: 12,
    vinylNoise: -20,
    compression: -15,
    wobble: 0.2,
    saturation: 0.3
  });

  const navigate = useNavigate();
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle time update
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    setLoading(true);
    setFile(uploadedFile);
    
    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const decodedBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      setAudioBuffer(decodedBuffer);
      setDuration(decodedBuffer.duration);
      
      if (autoPlay) {
        handlePlayPause();
      }
      
      setSnackbar({
        open: true,
        message: 'Audio file loaded successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error loading file:', error);
      setSnackbar({
        open: true,
        message: 'Error loading audio file',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Play/Pause handler
  const handlePlayPause = async () => {
    if (!audioBuffer) return;

    if (isPlaying) {
      audioSourceRef.current?.stop();
      setIsPlaying(false);
      setCurrentTime(0);
    } else {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start(0, currentTime);
      audioSourceRef.current = source;
      setIsPlaying(true);
    }
  };

  // Apply preset
  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    setSettings(EffectPresets[preset].settings);
    setSnackbar({
      open: true,
      message: `Applied ${EffectPresets[preset].name} preset`,
      severity: 'success'
    });
  };

  // Settings change handler
  const handleSettingChange = (setting) => (event, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Export processed audio
  const handleExport = async () => {
    if (!audioBuffer) return;
    
    setLoading(true);
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: 'Audio exported successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error exporting audio',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #4a1a8b 50%, #1a1a1a 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={() => navigate('/')}
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" color="white">
              LoFi Converter
            </Typography>
          </Box>
          
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={autoPlay}
                  onChange={(e) => setAutoPlay(e.target.checked)}
                  color="secondary"
                />
              }
              label={<Typography color="white">Auto Play</Typography>}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Left side - Original Audio */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="white">
                  Original Track
                </Typography>
                <Tooltip title="Effect Presets">
                  <IconButton
                    onClick={() => setShowPresets(true)}
                    sx={{ color: 'white' }}
                  >
                    <AutoFixHigh />
                  </IconButton>
                </Tooltip>
              </Box>
              
              {!file ? (
                <Box
                  sx={{
                    border: '2px dashed #8b5cf6',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center'
                  }}
                >
                  <input
                    accept="audio/*"
                    style={{ display: 'none' }}
                    id="audio-file"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="audio-file">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUpload />}
                      sx={{ mb: 2 }}
                    >
                      Upload Audio
                    </Button>
                  </label>
                  <Typography color="grey.500">
                    Supported formats: MP3, WAV
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LibraryMusic sx={{ color: 'white', mr: 1 }} />
                    <Typography color="white">
                      {file.name}
                    </Typography>
                  </Box>
                  
                  <VisualizeAudio 
                    audioBuffer={audioBuffer}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                  />
                  
                  <Box sx={{ 
                    mt: 2, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Timer sx={{ color: 'white', mr: 1 }} />
                    <Typography color="white" variant="body2" sx={{ mr: 2 }}>
                      {Math.floor(currentTime)}s / {Math.floor(duration)}s
                    </Typography>
                    
                    <IconButton
                      onClick={handlePlayPause}
                      sx={{ color: 'white' }}
                    >
                      {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                  </Box>
                </Box>
              )}
            </StyledPaper>
          </Grid>

          {/* Right side - Controls & Output */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" color="white">
                  LoFi Settings
                </Typography>
                <IconButton
                  onClick={() => setShowSettings(true)}
                  sx={{ color: 'white' }}
                >
                  <Settings />
                </IconButton>
              </Box>

              {loading && <LinearProgress sx={{ mb: 2 }} />}

              {file && (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography color="white" gutterBottom>
                      Filter Frequency
                      </Typography>
                    <Slider
                      value={settings.filterFreq}
                      onChange={handleSettingChange('filterFreq')}
                      min={200}
                      max={4000}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: 200, label: '200Hz' },
                        { value: 4000, label: '4kHz' }
                      ]}
                    />
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography color="white" gutterBottom>
                      Vinyl Noise
                    </Typography>
                    <Slider
                      value={settings.vinylNoise}
                      onChange={handleSettingChange('vinylNoise')}
                      min={-40}
                      max={0}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: -40, label: '-40dB' },
                        { value: 0, label: '0dB' }
                      ]}
                    />
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography color="white" gutterBottom>
                      Saturation
                    </Typography>
                    <Slider
                      value={settings.saturation}
                      onChange={handleSettingChange('saturation')}
                      min={0}
                      max={1}
                      step={0.1}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: 0, label: '0' },
                        { value: 1, label: 'Max' }
                      ]}
                    />
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography color="white" gutterBottom>
                      Wobble
                    </Typography>
                    <Slider
                      value={settings.wobble}
                      onChange={handleSettingChange('wobble')}
                      min={0}
                      max={1}
                      step={0.1}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: 0, label: '0' },
                        { value: 1, label: 'Max' }
                      ]}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        startIcon={<Refresh />}
                        fullWidth
                        onClick={() => setSettings(EffectPresets.CLASSIC_LOFI.settings)}
                      >
                        Reset Settings
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        fullWidth
                        onClick={handleExport}
                        color="secondary"
                      >
                        Export
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </StyledPaper>
          </Grid>
        </Grid>

        {/* Presets Dialog */}
        <Dialog
          open={showPresets}
          onClose={() => setShowPresets(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <DialogTitle sx={{ color: 'white' }}>Effect Presets</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {Object.entries(EffectPresets).map(([key, preset]) => (
                <Grid item xs={12} key={key}>
                  <Card 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                    onClick={() => {
                      handlePresetChange(key);
                      setShowPresets(false);
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" color="white">
                        {preset.name}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        Filter: {preset.settings.filterFreq}Hz | 
                        Noise: {preset.settings.vinylNoise}dB |
                        Wobble: {preset.settings.wobble}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPresets(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Advanced Settings Dialog */}
        <Dialog
          open={showSettings}
          onClose={() => setShowSettings(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <DialogTitle sx={{ color: 'white' }}>Advanced Settings</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {[
                { key: 'tempo', label: 'Tempo', min: 60, max: 120, unit: 'BPM' },
                { key: 'reverbMix', label: 'Reverb Mix', min: 0, max: 1, step: 0.1 },
                { key: 'bitDepth', label: 'Bit Depth', min: 1, max: 16, step: 1 },
                { key: 'compression', label: 'Compression', min: -30, max: 0, unit: 'dB' }
              ].map((setting) => (
                <Grid item xs={12} key={setting.key}>
                  <Typography color="white" gutterBottom>
                    {setting.label}
                  </Typography>
                  <Slider
                    value={settings[setting.key]}
                    onChange={handleSettingChange(setting.key)}
                    min={setting.min}
                    max={setting.max}
                    step={setting.step || 1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => 
                      setting.unit ? `${value}${setting.unit}` : value
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSettings(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoFiPage;