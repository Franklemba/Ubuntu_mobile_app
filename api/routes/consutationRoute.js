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
    const { name, email, message, doctorType } = req.body;

      // res.send(req.body);
      console.log(req.body);
  
    // // Validate the data
    if (!name  || !email || !message || !doctorType ) {
      return res.status(400).send('All fields are required');
    }
  
    // Save to database
    const newConsultation = new Consultation({ name, email, message, doctorType });
    try {
      await newConsultation.save();
      console.log("Successfully saved to database");
      res.status(201).send('Consultation submitted successfully');
    } catch (error) {
      console.log("error")
      res.status(500).send('Server error');
    }


  });




module.exports = router;