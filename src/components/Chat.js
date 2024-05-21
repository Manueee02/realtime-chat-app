// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import Message from './Message';
import Input from './Input';
import { Box, Paper, List, Typography, Divider } from '@mui/material';

function Chat({ socket, username }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('userList', (users) => {
      setUsers(users);
    });

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.off('message');
      socket.off('userList');
      socket.off('notification');
    };
  }, [socket]);

  const sendMessage = (text) => {
    socket.emit('sendMessage', { user: username, text });
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Paper elevation={3} style={{ flex: 1, overflow: 'auto', marginBottom: '10px' }}>
        <List>
          {notifications.map((note, index) => (
            <Typography key={index} variant="subtitle2" style={{ color: 'gray' }}>
              {note}
            </Typography>
          ))}
          {messages.map((msg, index) => (
            <Message key={index} user={msg.user} text={msg.text} />
          ))}
        </List>
      </Paper>
      <Input sendMessage={sendMessage} />
      <Divider />
      <Box padding="10px">
        <Typography variant="h6">Online Users</Typography>
        <List>
          {users.map((user) => (
            <Typography key={user.id} variant="body1">
              {user.username}
            </Typography>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Chat;
