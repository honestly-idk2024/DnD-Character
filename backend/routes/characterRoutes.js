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
router.post("/register", async (req, res) => {
    try {
        const { id, characterName, level } = req.body;
        // Check if the user already exists
        const existingUser = await Character.findOne({ characterName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const newCharacter = new Character({
            id,
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