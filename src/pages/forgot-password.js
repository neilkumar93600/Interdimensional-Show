import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text, Link } from '@chakra-ui/react';
import { makeStyles } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gradientBg: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log('Password reset requested for:', email);
  };

  return (
    <Flex className={classes.gradientBg} align="center" justify="center">
      <Box bg="white" p={8} rounded="md" shadow="md" maxWidth="400px" width="100%">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>Forgot Password</Heading>
        <Text textAlign="center" mb={4}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>
        <form onSubmit={handleResetPassword}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={6}
            required
          />
          <Button type="submit" colorScheme="blue" width="100%" mb={4}>
            Reset Password
          </Button>
        </form>
        <Text textAlign="center">
          Remember your password? <Link as={RouterLink} to="/login" color="blue.500">Log In</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
