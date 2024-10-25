import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Alert,
    Snackbar,
    Slider,
    LinearProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Stack,
    Card,
    CardContent
} from '@mui/material';
import {
    Delete,
    Download,
    Share,
    CloudUpload,
    Facebook,
    Twitter,
    LinkedIn,
    WhatsApp,
    Refresh,
    Settings,
    Help
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import axios from 'axios';

// FFmpeg Configuration
const ffmpeg = new FFmpeg();
const BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';

// Voice Configuration
const VOICE_OPTIONS = [
    { value: 'alloy', label: 'Alloy', description: 'Versatile and balanced voice' },
    { value: 'echo', label: 'Echo', description: 'Warm and precise voice' },
    { value: 'fable', label: 'Fable', description: 'Expressive and dynamic voice' },
    { value: 'onyx', label: 'Onyx', description: 'Deep and resonant voice' },
    { value: 'nova', label: 'Nova', description: 'Youthful and bright voice' }
];

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
const DEFAULT_ROAST_DURATION = 15; // seconds

// Styled Components
const GradientBackground = styled(Box)({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #4c1d95 0%, #1a1a1a 50%, #2d1b4e 100%)',
    padding: '64px 32px 32px 32px'
});

const UploadBox = styled(Paper)(({ theme }) => ({
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '2px dashed rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: theme.transitions.create(['background-color', 'border-color'], {
        duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: theme.palette.primary.main,
    }
}));

const ImagePreview = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    borderRadius: '8px'
});

const VideoPreview = styled('video')({
    width: '100%',
    height: '300px',
    objectFit: 'contain',
    borderRadius: '8px'
});

const RoastVideoCreator = () => {
    // State Management
    const [imageFile, setImageFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('alloy');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [roastScript, setRoastScript] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [settings, setSettings] = useState({
        duration: DEFAULT_ROAST_DURATION,
        subtitleColor: '#ffffff',
        subtitleSize: 24,
        roastStyle: 'funny'
    });
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

    // FFmpeg Initialization
    useEffect(() => {
        const loadFFmpeg = async () => {
            try {
                await ffmpeg.load({
                    coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
                    wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
                });
                setFfmpegLoaded(true);
                showAlert('Video processor initialized successfully', 'success');
            } catch (error) {
                console.error('FFmpeg initialization error:', error);
                showAlert('Failed to initialize video processor', 'error');
            }
        };
        loadFFmpeg();
    }, []);

    // File Upload Handler
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            const error = rejectedFiles[0].errors[0];
            if (error.code === 'file-too-large') {
                showAlert(`File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`, 'error');
            } else if (error.code === 'file-invalid-type') {
                showAlert('Invalid file type. Please upload an image file', 'error');
            }
            return;
        }

        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageFile({
                    url: e.target.result,
                    file: file,
                    name: file.name
                });
                showAlert('Image uploaded successfully', 'success');
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': SUPPORTED_FORMATS
        },
        maxSize: MAX_FILE_SIZE,
        multiple: false
    });

    // Alert Handler
    const showAlert = (message, severity = 'info') => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false });
    };

    // Video Generation Process
    const analyzeImageAndGenerateRoast = async () => {
        if (!imageFile || !ffmpegLoaded) return;

        setIsLoading(true);
        setProgress(0);

        try {
            // Step 1: Analyze image and generate roast
            setStatusMessage('Analyzing image...');
            const imageAnalysisResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a ${settings.roastStyle} roast comedian. Create a ${settings.roastStyle} roast based on the image provided.`
                        },
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: `Create a ${settings.duration}-second roast that matches this style: ${settings.roastStyle}`
                                },
                                {
                                    type: 'image_url',
                                    image_url: { url: imageFile.url }
                                }
                            ]
                        }
                    ],
                    max_tokens: 500
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const generatedScript = imageAnalysisResponse.data.choices[0].message.content;
            setRoastScript(generatedScript);
            setProgress(30);

            // Step 2: Generate Audio
            setStatusMessage('Generating audio...');
            const audioResponse = await axios.post(
                'https://api.openai.com/v1/audio/speech',
                {
                    model: 'tts-1',
                    voice: selectedVoice,
                    input: generatedScript
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob'
                }
            );

            const audioBlob = new Blob([audioResponse.data], { type: 'audio/mpeg' });
            setAudioBlob(audioBlob);
            setProgress(60);

            // Step 3: Generate Video
            await generateVideo(audioBlob, generatedScript);
            setProgress(100);
            showAlert('Video generated successfully!', 'success');

        } catch (error) {
            console.error('Error in video generation:', error);
            showAlert('Error: ' + error.message, 'error');
        } finally {
            setIsLoading(false);
            setStatusMessage('');
        }
    };

    // Video Generation Helper Functions
    const generateSRT = (text) => {
        const words = text.split(' ');
        let srt = '';
        let index = 1;
        let currentTime = 0;
        const wordsPerLine = Math.ceil(words.length / (settings.duration / 3));

        for (let i = 0; i < words.length; i += wordsPerLine) {
            const line = words.slice(i, i + wordsPerLine).join(' ');
            const duration = settings.duration / (Math.ceil(words.length / wordsPerLine));

            const startTime = formatSRTTime(currentTime);
            currentTime += duration;
            const endTime = formatSRTTime(currentTime);

            srt += `${index}\n${startTime} --> ${endTime}\n${line}\n\n`;
            index++;
        }

        return srt;
    };

    const formatSRTTime = (seconds) => {
        const pad = (num) => num.toString().padStart(2, '0');
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${ms.toString().padStart(3, '0')}`;
    };

    const generateVideo = async (audioBlob, script) => {
    try {
        setStatusMessage('Preparing video components...');

        // Convert files to ArrayBuffer
        const imageArrayBuffer = await imageFile.file.arrayBuffer();
        const audioArrayBuffer = await audioBlob.arrayBuffer();

        // Write files to FFmpeg virtual filesystem
        await ffmpeg.writeFile('input.jpg', new Uint8Array(imageArrayBuffer));
        await ffmpeg.writeFile('audio.mp3', new Uint8Array(audioArrayBuffer));

        // Generate and write subtitles
        const subtitles = generateSRT(script);
        await ffmpeg.writeFile('subtitles.srt', subtitles);

        setStatusMessage('Generating video...');

        // FFmpeg command for video generation in portrait mode (1080x1920) with padding and scaling
        await ffmpeg.exec([
            '-loop', '1',
            '-i', 'input.jpg',
            '-i', 'audio.mp3',
            '-vf', `subtitles=subtitles.srt:force_style='FontSize=${settings.subtitleSize},FontColor=${settings.subtitleColor},Alignment=10,BorderStyle=3,Outline=1,Shadow=0',
                    scale=1080:-1, pad=1080:1920:(ow-iw)/2:(oh-ih)/2`,
            '-c:v', 'libx264',
            '-tune', 'stillimage',
            '-c:a', 'aac',
            '-b:a', '192k',
            '-pix_fmt', 'yuv420p',
            '-shortest',
            '-t', `${settings.duration}`,
            'output.mp4'
        ]);

        const data = await ffmpeg.readFile('output.mp4');
        const videoBlob = new Blob([data], { type: 'video/mp4' });
        setVideoUrl(URL.createObjectURL(videoBlob));
    } catch (error) {
        throw new Error('Failed to generate video: ' + error.message);
    }
};


    // UI Event Handlers
    const handleDeleteImage = () => {
        setImageFile(null);
        setRoastScript('');
        setAudioBlob(null);
        setVideoUrl('');
        showAlert('Content cleared', 'info');
    };

    const handleDownloadVideo = () => {
        if (videoUrl) {
            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = 'roast-video.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleShareVideo = () => {
        setShareDialogOpen(true);
    };

    const handleSettingsChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    return (
        <GradientBackground>
            <Box maxWidth="1200px" margin="auto">
                {/* Header */}
                <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: 'white' }}>
                    15-Second Roast Video Creator
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                    Upload an image and let AI create a hilarious roast video!
                </Typography>

                {/* Main Content */}
                <Paper elevation={3} sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <Grid container spacing={4}>
                        {/* Left Side - Upload Form */}
                        <Grid item xs={12} md={6}>
                            <Box position="relative">
                                {isLoading && (
                                    <Box position="absolute" width="100%" zIndex={1}>
                                        <LinearProgress variant="determinate" value={progress} />
                                    </Box>
                                )}
                                {imageFile ? (
                                    <Box position="relative">
                                        <ImagePreview src={imageFile.url} alt="Uploaded content" />
                                        <IconButton
                                            onClick={handleDeleteImage}
                                            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)' }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <UploadBox {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <CloudUpload sx={{ fontSize: 64, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
                                        <Typography variant="h6" color="textSecondary">
                                            {isDragActive ? "Drop your image here" : "Drag & drop or click to upload"}
                                        </Typography>
                                    </UploadBox>
                                )}
                            </Box>

                            {/* Voice Selection */}
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Voice</InputLabel>
                                <Select
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(e.target.value)}
                                    label="Voice"
                                >
                                    {VOICE_OPTIONS.map((voice) => (
                                        <MenuItem key={voice.value} value={voice.value}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography>{voice.label}</Typography>
                                                <Help fontSize="small" />
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Settings Button */}
                            <Button
                                startIcon={<Settings />}
                                onClick={() => setSettingsDialogOpen(true)}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Advanced Settings
                            </Button>
                        </Grid>

                        {/* Right Side - Video Preview and Controls */}
                        <Grid item xs={12} md={6}>
                            {videoUrl ? (
                                <VideoPreview src={videoUrl} controls />
                            ) : (
                                <Box height="300px" display="flex" alignItems="center" justifyContent="center" bgcolor="rgba(0,0,0,0.1)" borderRadius="8px">
                                    <Typography variant="h6" color="textSecondary">
                                        Your roast video will appear here
                                    </Typography>
                                </Box>
                            )}

                            {/* Action Buttons */}
                            <Stack spacing={2} mt={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={analyzeImageAndGenerateRoast}
                                    disabled={!imageFile || isLoading}
                                    startIcon={isLoading ? <CircularProgress size={20} /> : <Refresh />}
                                    fullWidth
                                >
                                    {isLoading ? 'Generating...' : 'Generate Roast Video'}
                                </Button>

                                {videoUrl && (
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<Download />}
                                            onClick={handleDownloadVideo}
                                            fullWidth
                                        >
                                            Download
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            startIcon={<Share />}
                                            onClick={handleShareVideo}
                                            fullWidth
                                        >
                                            Share
                                        </Button>
                                    </Stack>
                                )}
                            </Stack>

                            {/* Status and Script Display */}
                            {statusMessage && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    {statusMessage}
                                </Alert>
                            )}
                            
                            {roastScript && (
                                <Card sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>Generated Script:</Typography>
                                        <Typography variant="body1">{roastScript}</Typography>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                    </Grid>
                </Paper>

                {/* Settings Dialog */}
                <Dialog open={settingsDialogOpen} onClose={() => setSettingsDialogOpen(false)}>
                    <DialogTitle>Advanced Settings</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} sx={{ minWidth: 300, mt: 1 }}>
                            <Box>
                                <Typography gutterBottom>Video Duration (seconds)</Typography>
                                <Slider
                                    value={settings.duration}
                                    onChange={(_, value) => handleSettingsChange('duration', value)}
                                    min={5}
                                    max={30}
                                    marks
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel>Roast Style</InputLabel>
                                <Select
                                    value={settings.roastStyle}
                                    onChange={(e) => handleSettingsChange('roastStyle', e.target.value)}
                                    label="Roast Style"
                                >
                                    <MenuItem value="funny">Funny</MenuItem>
                                    <MenuItem value="witty">Witty</MenuItem>
                                    <MenuItem value="sarcastic">Sarcastic</MenuItem>
                                    <MenuItem value="playful">Playful</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSettingsDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Share Dialog */}
                <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
                    <DialogTitle>Share Video</DialogTitle>
                    <DialogContent>
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ p: 2 }}>
                            <IconButton color="primary" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${videoUrl}`)}>
                                <Facebook />
                            </IconButton>
                            <IconButton color="info" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${videoUrl}`)}>
                                <Twitter />
                            </IconButton>
                            <IconButton color="primary" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${videoUrl}`)}>
                                <LinkedIn />
                            </IconButton>
                            <IconButton color="success" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(videoUrl)}`)}>
                                <WhatsApp />
                            </IconButton>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Alert */}
                <Snackbar
                    open={alert.open}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Alert onClose={handleCloseAlert} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </GradientBackground>
    );
};

export default RoastVideoCreator;