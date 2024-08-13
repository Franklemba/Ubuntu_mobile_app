// server.js

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app); // Create an HTTP server
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoutes");
const mainRoute = require("./routes/mainRoute");
const userRoutes = require("./routes/userRoutes");
const consultationRoute = require("./routes/consutationRoute");

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Ubuntu_app", { useNewUrlParser: true })
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => console.log('Error connecting to database ', err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ extended: false }));

// Chat message schema and model
const chatMessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages
  ChatMessage.find().then((messages) => {
    socket.emit('load messages', messages);
  });

  // Handle incoming chat messages
  socket.on('send message', (data) => {
    const newMessage = new ChatMessage(data);
    newMessage.save().then(() => {
      io.emit('new message', newMessage);
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/users", userRoutes);
app.use("/consultation", consultationRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
