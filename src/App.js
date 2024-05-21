// src/App.js
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import './App.css';

const socket = io('http://localhost:5000'); // Assicurati che l'indirizzo sia corretto

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username) {
      setIsLoggedIn(true);
      socket.emit('join', username);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Join Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;
