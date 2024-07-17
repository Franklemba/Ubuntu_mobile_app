const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");


const authRoute = require("./routes/authRoutes");
const mainRoute = require("./routes/mainRoute");
// const userRoutes = require("./routes/userRoutes");#

const consultationRoute = require("./routes/consutationRoute");


// Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/Ubuntu_app", { useNewUrlParser: true })

.then(() => {
  console.log('Database is connected');
})
.catch((err) => console.log('Error connecting to database ', err));


// app.use(bodyParser.json());


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.urlencoded({ extended: false })); 
  
  

// // Routes
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoutes);
app.use("/", mainRoute)
app.use("/auth", authRoute);
app.use("/consultation", consultationRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port  ${PORT}`));
