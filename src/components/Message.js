// src/components/Message.js
import React from 'react';

function Message({ user, text }) {
  return (
    <div className="message">
      <strong>{user}:</strong> {text}
    </div>
  );
}

export default Message;
