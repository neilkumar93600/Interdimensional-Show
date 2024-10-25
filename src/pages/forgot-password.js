import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Email,
  LockReset,
} from '@mui/icons-material';
import { resetPassword } from '../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const result = await resetPassword(email);
      if (result.success) {
        setMessage('Password reset email sent. Please check your inbox.');
        setEmail(''); // Clear email field after successful submission
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #111827, #4c1d95, #111827)',
        padding: '20px',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <LockReset
              sx={{
                fontSize: 40,
                mr: 2,
                background: 'linear-gradient(45deg, #4c1d95, #1e40af)',
                borderRadius: '50%',
                padding: 1,
                color: 'white',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4c1d95, #1e40af)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Reset Password
            </Typography>
          </Box>

          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            sx={{ mb: 3 }}
          >
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                height: 48,
                background: 'linear-gradient(45deg, #4c1d95, #1e40af)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #3c1773, #183385)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            <Link
              to="/login"
              style={{
                color: '#4c1d95',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Back to Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;