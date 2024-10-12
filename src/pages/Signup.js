import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text, Link } from '@chakra-ui/react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const GradientBackground = styled('div')({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  minHeight: '100vh',
});

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Implement sign up logic here
    console.log('Sign up attempted with:', name, email, password);
  };

  return (
    <GradientBackground>
      <Flex align="center" justify="center" minHeight="100vh">
        <Box bg="white" p={8} rounded="md" shadow="md" maxWidth="400px" width="100%">
          <Heading as="h2" size="xl" textAlign="center" mb={6}>Sign Up</Heading>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={4}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={4}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              mb={6}
              required
            />
            <Button type="submit" colorScheme="blue" width="100%" mb={4}>
              Sign Up
            </Button>
          </form>
          <Text textAlign="center">
            Already have an account? <Link as={RouterLink} to="/login" color="blue.500">Log In</Link>
          </Text>
        </Box>
      </Flex>
    </GradientBackground>
  );
};

export default SignUp;
