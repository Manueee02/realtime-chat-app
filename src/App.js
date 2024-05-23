import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import { Container, TextField, Button, Typography } from '@mui/material';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatIds, setChatIds] = useState([]);

  const handleRegister = () => {
    socket.emit('register', { email: emailRegister, password: passwordRegister, username });
  };

  const handleLogin = () => {
    socket.emit('login', { email: emailLogin, password: passwordLogin });
  };

  socket.on('registrationSuccess', () => {
    handleLogin();
  });

  socket.on('loginSuccess', ({ username, chatIds }) => {
    setUsername(username);
    setIsLoggedIn(true);
    setChatIds(chatIds);
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      {isLoggedIn ? (
        <Chat socket={socket} username={username} chatIds={chatIds} />
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Typography variant="h4" style={{ marginTop: '20px' }} gutterBottom>
            Register
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
