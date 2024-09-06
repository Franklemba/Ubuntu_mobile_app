// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Add more fields if necessary
});

module.exports = mongoose.model('Chat', chatSchema);