const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
    doctorType:{
        type: String,
        required: true,
    },
    
  createdAt:{
    type: Date,
    required: true,
    default: Date.now
 }
})


module.exports = mongoose.model("ConsultationRequest", consultationSchema);