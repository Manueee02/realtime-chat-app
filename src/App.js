// src/App.js
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import { Container, TextField, Button, Typography } from '@mui/material';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username) {
      setIsLoggedIn(true);
      socket.emit('join', username);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    socket.disconnect();
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      {!isLoggedIn ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Enter your username
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Join Chat
          </Button>
        </div>
      ) : (
        <div>
          
          <Chat socket={socket} username={username} />
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
