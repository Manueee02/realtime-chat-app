// server/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let users = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    users.push({ id: socket.id, username });
    io.emit('userList', users);
    io.emit('notification', `${username} has joined the chat`);
    console.log(`${username} has joined the chat`);
  });

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    const user = users.find((user) => user.id === socket.id);
    if (user) {
      users = users.filter((user) => user.id !== socket.id);
      io.emit('userList', users);
      io.emit('notification', `${user.username} has left the chat`);
      console.log(`${user.username} has left the chat`);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
