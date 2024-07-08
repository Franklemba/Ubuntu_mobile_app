require("dotenv").config()
const express = require("express");
const router = express.Router();
const app = express();
// const session = require('express-session');
// const axios = require("axios");
// app.use(cors());

const Consultation = require("../Models/consultationSchema")



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
        consultationReason
     } = req.body;

      // res.send(req.body);
      
      if (!previousTreatments || !specialistAppointments || !medications || !allergies || !recentSkinTreatments || !healthConditions || !doctorType || !consultationReason) {
        
        console.log('All fields are required');
        return res.status(400).send('All fields are required');
  
      }else{
        console.log(req.body);
        
          // Save to database
          const newConsultation = new Consultation({ 
             previousTreatments,
              specialistAppointments,
              medications,
              allergies,
              recentSkinTreatments,
              healthConditions,
              doctorType,
              consultationReason
           });
           
           try {
             await newConsultation.save();
             console.log("Successfully saved to database");
             res.status(201).send('Consultation submitted successfully');
           } catch (error) {
             console.log("error")
             res.status(500).send('Server error');
           }
      }


  });




module.exports = router;