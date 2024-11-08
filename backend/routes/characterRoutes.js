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
        const { token, characterName, level, race, characterClass } = req.body;
        // Check if the user already exists
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        userID = decoded.id;
        // Create new user
        const newCharacter = new Character({
            userId: userID,
            characterName: characterName,
            level: level,

            class: characterClass,
            race: race,
            alignment: null,
            // AC 10 + dex mod
            AC: 10,
            HP: null,

            statStr: null,
            statDex: null,
            statCon: null,
            statInt: null,
            statWis: null,
            statChar: null,

            appearance: null,
            personalityTraits: null,
            ideals: null,
            bonds: null,
            flaws: null,
            background: null,
        });

        const character = await newCharacter.save();


        res.status(200).json({character})
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
        console.error("Error:", error);
    }
});



module.exports = router;