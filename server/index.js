// server/index.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Message = require('./models/Message');
const Chat = require('./models/Chat');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

mongoose.connect('mongodb+srv://manuelsviluppo02:ZpRo9FvAr0xHPC1T@cluster0.s9tbcwb.mongodb.net/chattapp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

let users = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('register', async ({ email, password, username }) => {
    try {
      console.log("Registration request received:", { email, username });
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Registration error: Email already exists");
        socket.emit('registrationError', 'Email already exists');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, username });
      await newUser.save();

      console.log("Registration success:", { email, username });
      socket.emit('registrationSuccess');
    } catch (error) {
      console.error('Registration error:', error.message);
      socket.emit('registrationError', 'Registration failed');
    }
  });

  socket.on('login', async ({ email, password }) => {
    try {
      console.log("Login request received:", { email });
      const user = await User.findOne({ email });
      if (!user) {
        console.log("Login error: User not found");
        socket.emit('loginError', 'User not found');
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Login error: Incorrect password");
        socket.emit('loginError', 'Incorrect password');
        return;
      }

      const chats = await Chat.find({ participants: user._id });
      const chatIds = chats.map(chat => chat._id);
      console.log("Login success:", { email, username: user.username });
      socket.emit('loginSuccess', { username: user.username, chatIds });

      const previousMessages = await Message.find({}); // Aggiungi un filtro se necessario
      socket.emit('previousMessages', previousMessages);

      users.push({ id: socket.id, username: user.username });
      io.emit('userList', users);
      io.emit('notification', `${user.username} has joined the chat`);
    } catch (error) {
      console.error('Login error:', error.message);
      socket.emit('loginError', 'Login failed');
    }
  });

  socket.on('sendMessage', async (message) => {
    console.log("Message received:", message);
    io.emit('message', message);

    const newMessage = new Message(message);
    await newMessage.save();
  });

  socket.on('disconnect', () => {
    const user = users.find((user) => user.id === socket.id);
    if (user) {
      console.log(`${user.username} disconnected`);
      users = users.filter((user) => user.id !== socket.id);
      io.emit('userList', users);
      io.emit('notification', `${user.username} has left the chat`);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
