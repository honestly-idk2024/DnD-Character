const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Character = require("../models/Character");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();


router.get("/", (req, res) => {
    res.send("Route is running.");
});
// Registration route
router.post("/create", async (req, res) => {
    try {
        const { token, characterName, level, race, characterClass } = req.body;
        // decodes token
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        userID = decoded.id;
        // Create new user

        let external = await externalAPI(race)
        console.log(external)
        const newCharacter = new Character({
            userId: userID,
            characterName: characterName,
            level: level,

            class: characterClass,
            race: race,
            alignment: external.alignment,
            speed: external.speed,
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
        console.log(character)
        
        res.status(200).json({"_id":character._id, "characterName": character.characterName})
    } catch (error) {
        res.status(500).json({ error: "Failed to create character" });
        console.error("Error:", error);
    }
});

async function externalAPI(race)
{
    let url = ''
    switch(race)
    {
        case 'Dragonborn':
            url = 'https://www.dnd5eapi.co/api/races/dragonborn'
        case 'Dwarf':
            url = 'https://www.dnd5eapi.co/api/races/dwarf'
        case 'Elf':
            url = 'https://www.dnd5eapi.co/api/races/elf'
        case 'Gnome':
            url = 'https://www.dnd5eapi.co/api/races/gnome'
        case 'Half-Elf':
            url = 'https://www.dnd5eapi.co/api/races/half-elf'
        case 'Half-Orc':
            url = 'https://www.dnd5eapi.co/api/races/half-orc'
        case 'Halfling':
            url = 'https://www.dnd5eapi.co/api/races/halfling'
        case 'Human':
            url = 'https://www.dnd5eapi.co/api/races/human'
        case 'Tiefling':
            url = 'https://www.dnd5eapi.co/api/races/tiefling'
    }
    
    const external = await fetch(url)
    const json = await external.json();
    
    return {alignment: json.alignment, speed: json.speed}
    
}

router.post("/delete", async (req, res) => {    
    try {
        const { token, _id } = req.body;
        // decodes token
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        userID = decoded.id;

        const characterDeleted = await Character.deleteOne({userId: userID, _id: new ObjectId(_id)});
        console.log(characterDeleted)
        if(characterDeleted.deletedCount != 1)
        {
            throw new TypeError('Issue has occured while deleting');
        }
        res.status(200).json({success: 'Successful Deletion' })
    }catch (error) {
        res.status(500).json({ error: "Failed to delete character" });
        console.error("Error:", error);
    }
});

router.post("/update", async (req, res) => {  
    try {
        const { token, _id, info } = req.body;
        // decodes token
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        userID = decoded.id;


    }catch (error) {
        res.status(500).json({ error: "Failed to update character" });
        console.error("Error:", error);
    }  
});

router.post("/info", async (req, res) => {    
    try {
        const { token, _id } = req.body;
        // decodes token
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        userID = decoded.id;

        const characterInfo = await Character.findOne({userId: userID, _id: new ObjectId(_id)});

        res.status(200).json(characterInfo)
    }catch (error) {
        res.status(500).json({ error: "Failed to get character information" });
        console.error("Error:", error);
    }
});

router.post("/characters", async (req, res) => {    
    try {
        const { token } = req.body;
        // decodes token
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        userID = decoded.id;

        const characters = await Character.find( {userId: userID},{characterName:true} );

        res.status(200).json(characters)
    }catch (error) {
        res.status(500).json({ error: "Failed to get user characters" });
        console.error("Error:", error);
    }
});




module.exports = router;