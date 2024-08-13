
require("dotenv").config()
const express = require("express");
const router = express.Router();
const app = express();
const Chat = require('../Models/chatSchema');
const Message = require('../Models/messageSchema');
// const session = require('express-session');
// const axios = require("axios");
// app.use(cors());

const Consultation = require("../Models/consultationSchema")



// Define Routes
router.get('/consultationRequests', async (req, res) => {
    

    try{

        const requests = await Consultation.find({});
        res.status(200).json({ 
            message: "consultation requests found",
            requests
            });


    }catch(err){
        res.status(500).json({ message: "consultation fetch failed", error: err.message });
    }

  });

  
  router.get('/chats', async (req, res) => {
    try {
      // Assuming you want to get all chat rooms
      const chats = await Chat.find().populate('participants', 'name'); // Populate participant names
      res.json(chats);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching chats' });
    }
  });

  router.get('/messages/:chatId', async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await Message.find({ chatId }).populate('sender', 'name');
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
  });



module.exports = router;