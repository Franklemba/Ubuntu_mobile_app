const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

const User = require("../Models/User.model");
// Create a new user
router.post("/", userController.createUser);

// Get all users

// Route to get doctors
router.get("/doctors", async (req, res) => {
    console.log('getting doctots')
    // try {
        // Fetch all users with accountType 'doctor'
        const doctors = await User.find({ accountType: "doctor" });
        res.status(200).json({ success: true, doctors });
        // } catch (error) {
            //   console.error("Error fetching doctors:", error);
            //   res.status(500).json({ success: false, message: "Failed to fetch doctors", error: error.message });
            // }
        });
        router.get("/", userController.getAllUsers);
// Get a specific user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);


module.exports = router;
