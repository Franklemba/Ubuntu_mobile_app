require("dotenv").config()
const express = require("express");
const router = express.Router();
const app = express();
// const session = require('express-session');
// const axios = require("axios");
// app.use(cors());

const Consultation = require("../Models/consultation.model")

const consultationController = require("../controller/consultation.controller");

router.get("/get/:userId", consultationController.getMyConsultations);

router.post("/sendMessage/:chatId", consultationController.sendMessage);

router.get("/getMessages/:chatId", consultationController.getMessages);

router.post("/accept/:consultationId", consultationController.acceptConsultation);


// Define Routes
router.post('/submit', async (req, res) => {
    const { 
        previousTreatments,
        specialistAppointments,
        medications,
        allergies,
        recentSkinTreatments,
        healthConditions,
        doctorType,
        consultationReason,
        patientId,
        patientName,
        patientEmail,
        patientPhone
           } = req.body;

      // res.send(req.body);
      
      if (!previousTreatments || !specialistAppointments || !medications || !allergies || !recentSkinTreatments || !healthConditions || !doctorType || !consultationReason) {
        
        console.log('All fields are required');
        return res.status(400).send('All fields are required');
  
      }else{
        
        
          // Save to database
          const newConsultation = new Consultation({ 
             previousTreatments,
              specialistAppointments,
              medications,
              allergies,
              recentSkinTreatments,
              healthConditions,
              doctorType,
              consultationReason,
              patientId,
              patientName,
              doctorId:'',
              doctorName:'',
              patientEmail,
              patientPhone
           });
           
           try {
             await newConsultation.save();
             console.log("Successfully saved to database");
             res.status(201).send('Consultation submitted successfully');
             console.log(newConsultation)
           } catch (error) {
             console.log(error);
             res.status(500).send('Server error');
           }
      }


  });




module.exports = router;