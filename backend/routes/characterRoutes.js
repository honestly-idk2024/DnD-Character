const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Character = require("../models/Character");
const router = express.Router();
var Mongoose = require('mongoose');
require("dotenv").config();


router.get("/", (req, res) => {
    res.send("Route is running.");
});
// Registration route
router.post("/create", async (req, res) => {
    try {
        const { token, characterName, level } = req.body;
        // Check if the user already exists
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        userID =decoded.id;
        // Create new user
        const newCharacter = new Character({
            userId,
            characterName,
            level
        });
        
        const user = await newCharacter.save();
    

        res.status(200)
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
        console.error("Error:", error);
    }
});



module.exports = router;