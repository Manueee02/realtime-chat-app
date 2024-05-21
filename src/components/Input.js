// src/components/Input.js
import React, { useState } from 'react';

function Input({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Input;
