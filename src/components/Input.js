// src/components/Input.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Input({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box display="flex" padding="10px" >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
        style={{ marginRight: '10px', color:"#30363D" }}
        id="input_text"
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        <SendIcon/>
      </Button>
    </Box>
  );
}

export default Input;
