
require("dotenv").config()
const express = require("express");
const router = express.Router();
const app = express();
// const session = require('express-session');
// const axios = require("axios");
// app.use(cors());

const Consultation = require("../Models/consultationSchema")
const User = require("../Models/User.model");



// Define Routes
router.get('/user_details', (req, res) => {
    const user = req.user;

    console.log(user);
    try{

        res.status(200).json({ 
            message: "User details found",
            user
            });

    }catch(err){
        res.status(500).json({ message: "Login failed", error: err.message });
    }

  });




module.exports = router;