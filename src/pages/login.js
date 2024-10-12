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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempted with:', email, password);
  };

  return (
    <Flex className={classes.gradientBg} align="center" justify="center">
      <Box bg="white" p={8} rounded="md" shadow="md" maxWidth="400px" width="100%">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>Login</Heading>
        <form onSubmit={handleLogin}>
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
            mb={6}
            required
          />
          <Button type="submit" colorScheme="blue" width="100%" mb={4}>
            Log In
          </Button>
        </form>
        <Text textAlign="center" mb={2}>
          <Link as={RouterLink} to="/forgot-password" color="blue.500">Forgot Password?</Link>
        </Text>
        <Text textAlign="center">
          Don't have an account? <Link as={RouterLink} to="/signup" color="blue.500">Sign Up</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
