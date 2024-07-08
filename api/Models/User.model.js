// userModel.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["patient", "doctor"],
    required: true,
  },
  specialty: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  acceptTerms: {
    type: Boolean,
    required: true,
  },
  createdAt:{
    type: Date,
    required: true,
    default: Date.now
 }
});

module.exports = mongoose.model("User", userSchema);
