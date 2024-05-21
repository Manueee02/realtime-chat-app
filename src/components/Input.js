// src/components/Input.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function Input({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box display="flex" padding="10px" borderTop="1px solid #ccc">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
}

export default Input;
