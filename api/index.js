const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Ubuntu_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));



  const consultationSchema = new mongoose.Schema({
    name: String,
    location: String,
    email: String,
    message: String,
    doctorType: String,
  });
  
  // Create a Model
  const Consultation = mongoose.model('Consultation', consultationSchema);
  
  // Define Routes
  app.post('/submit', async (req, res) => {
    const { name, location, email, message, doctorType } = req.body;
  
    // Validate the data
    if (!name || !location || !email || !message || !doctorType ) {
      return res.status(400).send('All fields are required');
    }
  
    // Save to database
    const newConsultation = new Consultation({ name, location, email, message, doctorType });
    try {
      await newConsultation.save();
      res.status(201).send('Consultation submitted successfully');
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  ${PORT}`));
