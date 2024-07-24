
require("dotenv").config()
const express = require("express");
const router = express.Router();
const app = express();
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




module.exports = router;