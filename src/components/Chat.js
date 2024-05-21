// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import Message from './Message';
import Input from './Input';

function Chat({ socket, username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (text) => {
    socket.emit('sendMessage', { user: username, text });
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} user={msg.user} text={msg.text} />
        ))}
      </div>
      <Input sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
