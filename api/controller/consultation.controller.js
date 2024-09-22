const Consultation = require("../Models/consultation.model");


// done()

// async function done(){
//   Consultation.deleteMany({}).then((done)=>{
//     console.log(done)
//   });
// }

// Create a new user
exports.getMyConsultations = async (req, res) => {
  try {
    // Extract user data from the request body
    const userId = req.params.userId
    console.log(userId)
    // Create a new user document
    const consultations = await Consultation.find({
      $or: [
        { patientId: userId },
        { doctorId: userId }
      ]
    });
    console.log(consultations)
    
    res.status(201).json({ message: "found consultations",consultations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};

// Fetch messages for a specific chat and reset unread message count
exports.getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.params.userId;  // We assume the user ID is passed in the request, modify as necessary
    
    // Find the consultation document by chatId
    const consultation = await Consultation.findById(chatId);

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found", messages: [] });
    }

    // Check whether the user is the patient or doctor
    if (consultation.patientId == userId) {
      // Reset the patient's unread message count
      consultation.patientMessageCount = 0;
      console.log('Patient fetched messages, unread count reset');
    } else if (consultation.doctorId == userId) {
      // Reset the doctor's unread message count
      consultation.doctorMessageCount = 0;
      console.log('Doctor fetched messages, unread count reset');
    } else {
      return res.status(403).json({ message: "Unauthorized access to messages", messages: [] });
    }

    // Save the updated consultation document
    await consultation.save();

    // Send the consultation messages back to the user
    res.status(200).json({ messages: consultation.messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: "Failed to fetch messages", messages: [], error: error.message });
  }
};

// Send a message and append it to the consultation's messages array
exports.sendMessage = async (req, res) => {
  try {
    // Extract user data from the request
    const chatId = req.params.chatId;
    const newMessage = req.body.message;

    console.log(chatId);
    console.log(newMessage);

    // Find the consultation document by chatId
    const consultation = await Consultation.findById(chatId);

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    // Append the new message to the messages array
    consultation.messages.push(newMessage);

    // Save the updated consultation document
    await consultation.save();

    res.status(201).json({ message: "Message sent", consultation,messages:consultation.messages  });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

// Send a message and append it to the consultation's messages array
exports.acceptConsultation = async (req, res) => {
  try {
    // Extract user data from the request
    const consultationId = req.params.consultationId;
    const doctorId = req.body.doctorId;
    const doctorName = req.body.doctorName;
   
   
    // Find the consultation document by chatId
    const consultation = await Consultation.findById(consultationId);

    if (!consultation ) {
      return res.status(404).json({ message: "Consultation not found" });
    }
    if (consultation.doctorId != '' && consultation.doctorId != doctorId) {
      return res.status(404).json({ message: "Consultation alread accepted" });
    }
    // Append the new message to the messages array
    consultation.doctorName = doctorName;
    consultation.doctorId = doctorId;

    // Save the updated consultation document
    await consultation.save();

    res.status(201).json({ message: "Consultation accepted", consultation  });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};


