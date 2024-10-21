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
    LinearProgress,
    Card,
    CardContent,
} from '@mui/material';
import {
    Delete,
    Download,
    Share,
    CloudUpload
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import axios from 'axios';

// Initialize FFmpeg
const ffmpeg = new FFmpeg();

// Styled components
const UploadBox = styled(Paper)(({ theme }) => ({
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '2px dashed rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: theme.palette.primary.main,
    }
}));

const ImagePreview = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    borderRadius: '8px',
});

const VideoPreview = styled('video')({
    width: '100%',
    height: '300px',
    objectFit: 'contain',
    borderRadius: '8px',
});

const GradientBackground = styled(Box)({
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #4c1d95, #1C1C1C, #1A002E)',
    padding: '64px 32px 32px 32px',
});

const RoastVideoCreator = () => {
    const [imageFile, setImageFile] = useState(null);
    const [additionalImage, setAdditionalImage] = useState(null);
    const [roastScript, setRoastScript] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [isLoading, setIsLoading] = useState(false);
    const [processProgress, setProcessProgress] = useState(0);
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    // Load FFmpeg on component mount
    useEffect(() => {
        const loadFfmpeg = async () => {
            try {
                await ffmpeg.load();
                setFfmpegLoaded(true);
                showAlert('FFmpeg loaded successfully', 'success');
            } catch (error) {
                console.error('Error loading FFmpeg:', error);
                showAlert('Failed to load video processing capabilities', 'error');
            }
        };
        loadFfmpeg();
    }, []);

    const showAlert = (message, severity = 'info') => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    // Dropzone setup for main image
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImageFile({
                url: e.target.result,
                file: file
            });
            reader.readAsDataURL(file);
            showAlert('Image uploaded successfully', 'success');
        } else {
            showAlert('Please upload a valid image file', 'error');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxSize: 10 * 1024 * 1024 // 10MB max file size
    });

    // Dropzone setup for additional image
    const onDropAdditional = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setAdditionalImage({
                url: e.target.result,
                file: file
            });
            reader.readAsDataURL(file);
            showAlert('Additional image uploaded successfully', 'success');
        } else {
            showAlert('Please upload a valid image file', 'error');
        }
    }, []);

    const { getRootProps: getRootPropsAdditional, getInputProps: getInputPropsAdditional } = useDropzone({
        onDrop: onDropAdditional,
        accept: {
            'image/*': []
        },
        maxSize: 10 * 1024 * 1024 // 10MB max file size
    });

    const analyzeImage = async (imageUrl) => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4-vision-preview',
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: 'Analyze this image and describe the key elements that could be used in a comedy routine.' },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: imageUrl,
                                    detail: 'low'
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 300
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error analyzing image:', error);
            throw error;
        }
    };

    const analyzeImageAndGenerateRoast = async () => {
        if (!imageFile) return;

        setIsLoading(true);
        setProcessProgress(0);

        try {
            // Analyze the main image
            setStatusMessage('Analyzing main image...');
            const mainImageAnalysis = await analyzeImage(imageFile.url);

            // Generate script
            setStatusMessage('Generating comedy script...');
            let scriptPrompt = `Generate a 15 sec roast comedy script for a everyone audience, containing only spoken dialogue without any stage directions, character names, or audience reactions. Base the script on this image analysis: ${mainImageAnalysis}`;

            const scriptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [{ role: 'user', content: scriptPrompt }],
                max_tokens: 500,
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const generatedScript = scriptResponse.data.choices[0].message.content;
            setRoastScript(generatedScript);
            showAlert('Roast script generated successfully', 'success');

            // Generate audio from the script
            await generateAudio(generatedScript);

        } catch (error) {
            console.error('Error analyzing image and generating roast:', error);
            showAlert('Failed to generate roast script', 'error');
        } finally {
            setIsLoading(false);
            setStatusMessage('');
        }
    };

    const generateAudio = async (script) => {
        try {
            setStatusMessage('Generating audio...');
            const response = await axios.post('https://api.openai.com/v1/audio/speech', {
                model: "tts-1",
                voice: "alloy",
                input: script
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            });

            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            setAudioBlob(audioBlob);
            showAlert('Audio generated successfully', 'success');

            // Proceed to create video
            await createVideo();

        } catch (error) {
            console.error('Error generating audio:', error);
            showAlert('Failed to generate audio', 'error');
        }
    };

    const createVideo = async () => {
        if (!imageFile || !audioBlob || !ffmpegLoaded) return;

        setIsLoading(true);
        setProcessProgress(0);
        setStatusMessage('Creating video...');

        try {
            // Write files to FFmpeg
            await ffmpeg.writeFile('image.png', await fetchFile(imageFile.url));
            await ffmpeg.writeFile('audio.mp3', await fetchFile(audioBlob));

            // Generate subtitles
            const subtitles = generateSubtitles(roastScript);
            await ffmpeg.writeFile('subtitles.srt', subtitles);

            // Create video
            await ffmpeg.exec([
                '-loop', '1',
                '-i', 'image.png',
                '-i', 'audio.mp3',
                '-vf', `subtitles=subtitles.srt:force_style='FontName=Arial,FontSize=24,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,BorderStyle=3'`,
                '-c:v', 'libx264',
                '-t', '15',
                '-pix_fmt', 'yuv420p',
                '-vf', 'scale=1280:720',
                'output.mp4'
            ]);

            // Read the result
            const data = await ffmpeg.readFile('output.mp4');
            const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
            const videoUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(videoUrl);

            showAlert('Roast video created successfully', 'success');
        } catch (error) {
            console.error('Error creating video:', error);
            showAlert('Failed to create video', 'error');
        } finally {
            setIsLoading(false);
            setProcessProgress(100);
            setStatusMessage('');
        }
    };

    const generateSubtitles = (script) => {
        // Simple subtitle generation logic
        const lines = script.split('. ');
        let srt = '';
        lines.forEach((line, index) => {
            const startTime = index * 3; // 3 seconds per line
            const endTime = (index + 1) * 3;
            srt += `${index + 1}\n`;
            srt += `00:00:${startTime.toString().padStart(2, '0')},000 --> 00:00:${endTime.toString().padStart(2, '0')},000\n`;
            srt += `${line}\n\n`;
        });
        return srt;
    };

    const handleDeleteImage = () => {
        setImageFile(null);
        setAdditionalImage(null);
        setRoastScript('');
        setAudioBlob(null);
        setVideoUrl('');
        showAlert('Images and generated content deleted', 'info');
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
        if (navigator.share && videoUrl) {
            navigator.share({
                title: '15-Second Roast Video',
                text: 'Check out this hilarious roast video!',
                url: videoUrl
            }).then(() => {
                showAlert('Video shared successfully', 'success');
            }).catch((error) => {
                console.error('Error sharing video:', error);
                showAlert('Failed to share video', 'error');
            });
        } else {
            showAlert('Sharing is not supported on this device', 'warning');
        }
    };

    return (
        <GradientBackground>
            <Box maxWidth="1200px" margin="auto" mt={6}>
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: 'white' }}>
                        15-Second Roast Video Creator
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                        Upload an image and let AI create a hilarious roast video!
                    </Typography>
                </motion.div>

                {/* Main Content */}
                <Paper elevation={3} sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <Grid container spacing={4}>
                        {/* Left Side - Upload Form */}
                        <Grid item xs={12} md={6}>
                            <Box position="relative">
                                {isLoading && (
                                    <Box position="absolute" width="100%" zIndex={1}>
                                        <LinearProgress variant="determinate" value={processProgress} />
                                    </Box>
                                )}
                                {imageFile ? (
                                    <ImagePreview src={imageFile.url} alt="Uploaded content" />
                                ) : (
                                    <UploadBox {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <CloudUpload sx={{ fontSize: 64, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
                                        <Typography variant="h6" color="textSecondary">
                                            {isDragActive
                                                ? "Drop your image here"
                                                : "Drag & drop or click to upload main image"}
                                        </Typography>
                                    </UploadBox>
                                )}
                            </Box>
                            
                            <Box mt={2} display="flex" justifyContent="center">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Delete />}
                                    onClick={handleDeleteImage}
                                    disabled={!imageFile || isLoading}
                                >
                                    Remove Images
                                </Button>
                            </Box>
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
                            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={analyzeImageAndGenerateRoast}
                                    disabled={!imageFile || isLoading}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Generate Roast Video
                                </Button>
                                {videoUrl && (
                                    <Box display="flex" justifyContent="center" gap={2} width="100%">
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
                                    </Box>
                                )}
                            </Box>
                            {statusMessage && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    {statusMessage}
                                </Alert>
                            )}
                            {roastScript && (
                                <Box mt={2}>
                                    <Typography variant="h6" gutterBottom>Generated Script:</Typography>
                                    <Paper elevation={2} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                                        <Typography variant="body1">{roastScript}</Typography>
                                    </Paper>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Paper>

                {/* Tips Section */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {[
                        { title: "Choose Wisely", description: "Select clear, interesting images for the best roast", icon: "🖼️" },
                        { title: "Keep it Fun", description: "Remember, it's all in good humor!", icon: "😂" },
                        { title: "Share Responsibly", description: "Make sure the subject is okay with the roast before sharing", icon: "🤝" }
                    ].map((tip, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h2" align="center" sx={{ mb: 2 }}>
                                            {tip.icon}
                                        </Typography>
                                        <Typography variant="h6" align="center" sx={{ color: 'white', mb: 1 }}>
                                            {tip.title}
                                        </Typography>
                                        <Typography variant="body1" align="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            {tip.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Alerts */}
                <Snackbar
                    open={alert.open}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Alert
                        onClose={handleCloseAlert}
                        severity={alert.severity}
                        sx={{ width: '100%' }}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </GradientBackground>
    );
};

export default RoastVideoCreator;