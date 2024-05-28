// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import Message from './Message';
import Input from './Input';
import { Box, Paper, List, Typography, Divider } from '@mui/material';

function Chat({ socket, username }) {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('previousMessages', (previousMessages) => {
      const formattedMessages = previousMessages.map((msg) => ({ ...msg, type: 'message' }));
      setEvents(formattedMessages);
    });

    socket.on('message', (message) => {
      setEvents((prevEvents) => [...prevEvents, { ...message, type: 'message' }]);
    });

    socket.on('userList', (users) => {
      setUsers(users);
    });

    socket.on('notification', (notification) => {
      const status = notification.includes('entra') ? 'entry' : notification.includes('esce') ? 'exit' : 'other';
      setEvents((prevEvents) => [...prevEvents, { text: notification, type: 'notification', status }]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('message');
      socket.off('userList');
      socket.off('notification');
    };
  }, [socket]);

  const sendMessage = (text) => {
    socket.emit('sendMessage', { user: username, text });
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" style={{backgroundColor: ""}}>
      <Paper elevation={3} style={{ 
          flex: 1, 
          overflow: 'auto', 
          marginBottom: '10px', 
          padding: "0.5rem", 
          borderRadius:"0.3rem",
          backgroundColor: "#161B22",
          color: "#8D96A0",
          }}>
        <List>
          {events.map((event, index) => (
            event.type === 'message' ? (
              <Message key={index} user={event.user} text={event.text} color1="#8D96A0" color2={"#8D96A0"}/>
            ) : (
              <Typography
                key={index}
                variant="subtitle2"
                style={{
                  color: event.text.includes('has joined the chat') ? '#29903B' : event.text.includes('has left the chat') ? '#B50000' : 'gray'
                }}
              >
                {event.text}
              </Typography>
            )
          ))}
        </List>
      </Paper>
      <Input sendMessage={sendMessage} />
      <Divider />
      <Box padding="10px" id="list_user">
        <Typography variant="h6" style={{color: "#E6EAE6"}}>Online Users</Typography>
        <List>
          {users.map((user) => (
            <Typography key={user.id} variant="body1" style={{color: "#8D96A0"}}>
              {user.username}
            </Typography>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Chat;
