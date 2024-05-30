import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import PrivacyPolicyDialog from './components/PrivacyPolicyDialog';
import {
  Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent, IconButton, InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

function App() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const [openPrivacyDialog, setOpenPrivacyDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatIds, setChatIds] = useState([]);

  useEffect(() => {
    socket.on('registrationSuccess', () => {
      toast.success('Registration successful! Logging in...');
      handleLogin();
    });

    socket.on('registrationError', (error) => {
      toast.error(`Registration error: ${error.message}`);
    });

    socket.on('loginSuccess', ({ username, chatIds }) => {
      setUsername(username);
      setIsLoggedIn(true);
      setChatIds(chatIds);
      handleCloseLoginDialog();
    });

    socket.on('loginError', (error) => {
      toast.error(`Login error: ${error.message}`);
    });

    return () => {
      socket.off('registrationSuccess');
      socket.off('registrationError');
      socket.off('loginSuccess');
      socket.off('loginError');
    };
  }, []);

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

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowPasswordRegister = () => {
    setShowPasswordRegister((prev) => !prev);
  };

  const handleOpenPrivacyDialog = () => {
    setOpenPrivacyDialog(true);
  };

  const handleClosePrivacyDialog = () => {
    setOpenPrivacyDialog(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <ToastContainer />
      {isLoggedIn ? (
        <Chat socket={socket} username={username} chatIds={chatIds} />
      ) : (
        <Card style={{ backgroundColor: '#161B22', color: '#8D96A0' }}>
          <CardContent>
            <Typography variant="h3" gutterBottom align="center" style={{ color: '#D9EAE6' }}>
              Welcome to Real-Time Chat
            </Typography>
            <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
              This is a real-time chat application where you can connect with anyone currently online.
              You can log in using the following test accounts or register to create a new account.
            </Typography>
            <Typography variant="body2" align="center" style={{ marginBottom: '20px' }}>
              <strong>Test Accounts:</strong><br />
              Email: tester2@gmail.com<br />
              Email: tester@gmail.com<br />
              Email: tester3@gmail.com<br />
              Password: test.1
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenLoginDialog(true)}
                style={{ marginRight: '20px' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenSignUpDialog(true)}
              >
                Sign Up
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Button
                variant="text"
                color="success"
                onClick={handleOpenPrivacyDialog}
              >
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Login Dialog */}
      <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog}>
        <DialogTitle style={{ backgroundColor: "#161B22", color: "#D9EAE6" }}>Login</DialogTitle>
        <DialogContent style={{ backgroundColor: "#161B22", color: "#D9EAE6",  padding: '1rem'  }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            color="success"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { backgroundColor: '#0D1117', color: '#8D96A0' },
            }}
            InputLabelProps={{
              style: { color: '#8D96A0' },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            color="success"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { backgroundColor: '#0D1117', color: '#8D96A0' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                    style={{ color: '#8D96A0' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: '#8D96A0' },
            }}
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#161B22", color: "#D9EAE6" }}>
          <Button onClick={handleCloseLoginDialog} color="success">Cancel</Button>
          <Button variant="contained" color="success" onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={openSignUpDialog} onClose={handleCloseSignUpDialog}>
        <DialogTitle style={{ backgroundColor: "#161B22", color: "#D9EAE6" }}>Sign Up</DialogTitle>
        <DialogContent style={{ padding: '1rem', backgroundColor: "#161B22" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            color="success"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { backgroundColor: '#0D1117', color: '#8D96A0' },
            }}
            InputLabelProps={{
              style: { color: '#8D96A0' },
            }}
          />
          <TextField
            label="Password"
            type={showPasswordRegister ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            color="success"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { backgroundColor: '#0D1117', color: '#8D96A0' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPasswordRegister}
                    edge="end"
                    style={{ color: '#8D96A0' }}
                  >
                    {showPasswordRegister ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: '#8D96A0' },
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            color="success"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { backgroundColor: '#0D1117', color: '#8D96A0' },
            }}
            InputLabelProps={{
              style: { color: '#8D96A0' },
            }}
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#161B22" }}>
          <Button onClick={handleCloseSignUpDialog} color="success">Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSignUp}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <PrivacyPolicyDialog open={openPrivacyDialog} handleClose={handleClosePrivacyDialog} />
    </Container>
  );
}

export default App;
