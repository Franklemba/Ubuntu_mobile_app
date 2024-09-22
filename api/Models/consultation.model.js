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
    patientId: {
       type: String,
       required: false
    },
    patientName: {
        type: String,
        required: false
     },
     doctorName: {
        type: String,
        required: false,
        default:''
     },
     patientEmail: {
         type: String, 
         required: false, 
     },
     patientPhone: {
          type: String,
          required: false
     },
  createdAt:{
    type: Date,
    required: true,
    default: Date.now
 },
    doctorId: {
        type: String,
        required: false
     },
     messages:{
       type: Array,
        default:[]
     },
     lastMessageRead:{
        type: Boolean,
        default:false
     },
    patientMessageCount:{
        type:Number,
        default:0
    }   ,
    doctorMessageCount:{
        type:Number,
        default:0
    }   
})


module.exports = mongoose.model("consultations", consultationSchema);