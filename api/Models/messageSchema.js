const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now },
    // Add more fields if necessary
  });
  
  module.exports = mongoose.model('Message', messageSchema);