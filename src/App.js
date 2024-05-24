import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatIds, setChatIds] = useState([]);

  const handleLogin = () => {
    socket.emit('login', { email: emailLogin, password: passwordLogin });
    handleCloseLoginDialog();
  };

  const handleSignUp = () => {
    socket.emit('register', { email: emailRegister, password: passwordRegister, username });
    handleCloseSignUpDialog();
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
    setEmailLogin('');
    setPasswordLogin('');
  };

  const handleCloseSignUpDialog = () => {
    setOpenSignUpDialog(false);
    setEmailRegister('');
    setPasswordRegister('');
    setUsername('');
  };

  socket.on('registrationSuccess', () => {
    handleLogin();
  });

  socket.on('loginSuccess', ({ username, chatIds }) => {
    setUsername(username);
    setIsLoggedIn(true);
    setChatIds(chatIds);
    handleCloseLoginDialog(); // Chiude la finestra di dialogo dopo il login
  });
  

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      {isLoggedIn ? (
        <Chat socket={socket} username={username} chatIds={chatIds} />
      ) : (
      <div>
        <Typography variant="h3" gutterBottom align="center">
          Welcome
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button variant="contained" color="primary" onClick={() => setOpenLoginDialog(true)} style={{ marginRight: '20px' }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpenSignUpDialog(true)}>
            Sign Up
          </Button>
        </div>

      {/* Login Dialog */}
      <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent style={{padding:"1rem"}}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoginDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={openSignUpDialog} onClose={handleCloseSignUpDialog}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent style={{padding:"1rem"}}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignUpDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      )}
    </Container>
  );
}

export default App;
/*Fai in modo che ci Sia tipo una card in cui sono inseriti i pulsanti e la scritta, e predisponi degli allert usando snackbar per gli errori della password o nel login, e implementa il backdrop quando faccio il login e mi va sul componente chat*/