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
const consultationRoute = require("./routes/consultationRoute");

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
<<<<<<< HEAD

mongoose.connect("mongodb://localhost:27017/Ubuntu_app", { useNewUrlParser: true })

.then(() => {
  console.log('Database is connected');
})
.catch((err) => console.log('Error connecting to database ', err));


// app.use(bodyParser.json());

=======
mongoose.connect("mongodb://127.0.0.1:27017/Ubuntu_app", { useNewUrlParser: true })
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => console.log('Error connecting to database ', err));
>>>>>>> ccff844a00ea4969bd500d708754c1139f65a04c

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ extended: false }));


const Consultation = require('./Models/consultation.model')
// Socket.IO connection
io.on('connection', async(socket) => {
  console.log('A user connected');

  // Send existing messages
  // ChatMessage.find().then((messages) => {
  //   socket.emit('load messages', messages);
  // });
  socket.on('joinSocket', (chatId)=>{
    socket.join(chatId)
    console.log(`User joined room: ${chatId}`);
  })

  // Handle incoming chat messages
  socket.on('sendMessage', async(data) => {
    console.log(data)
    const newMessage = data.message;

    console.log(data.chatId);
    console.log(newMessage);

    // Find the consultation document by chatId
    const consultation = await Consultation.findById(data.chatId);

    if (!consultation) {
      socket.emit('invalidChatId')
      return 
    }

    // Append the new message to the messages array
    consultation.messages.push(newMessage);
    // Save the updated consultation document
    await consultation.save();
    io.to(data.chatId).emit('incomingMessage', newMessage)

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
