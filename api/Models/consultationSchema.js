const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    doctorType:{
        type: String,
        required: true,
    },
    previousTreatments:{
        type: String,
        required: true,
    },
    medications:{
        type: String,
        required: true,
    },
    allergies:{
        type: String,
        required: true,
    },
    recentSkinTreatments:{
        type: String,
        required: true,
    },
    healthConditions:{
        type: String,
        required: true,
    },
    specialistAppointments:{
        type: String,
        required: true
    },
    consultationReason:{
        type: String,
        required: true
    },
    
  createdAt:{
    type: Date,
    required: true,
    default: Date.now
 }
})


module.exports = mongoose.model("ConsultationRequest", consultationSchema);