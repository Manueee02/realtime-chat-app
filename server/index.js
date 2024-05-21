const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Importa il modello del messaggio

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Connetti a MongoDB
mongoose.connect('mongodb+srv://manuelsviluppo02:ZpRo9FvAr0xHPC1T@cluster0.s9tbcwb.mongodb.net/chattapp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let users = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', async (username) => {
    users.push({ id: socket.id, username });
    io.emit('userList', users);

    // Invia i messaggi precedenti all'utente appena connesso
    const messages = await Message.find().sort({ createdAt: 1 });
    socket.emit('previousMessages', messages);

    io.emit('notification', `${username} has joined the chat`);
    console.log(`${username} has joined the chat`);
  });

  socket.on('sendMessage', async (message) => {
    // Salva il messaggio nel database
    const newMessage = new Message(message);
    await newMessage.save();

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
