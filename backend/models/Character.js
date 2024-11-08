const mongoose = require("mongoose");
// User model schema
const characterSchema = new mongoose.Schema({
userId: {type: String },
characterName: { type: String },
level: { type: Number },

class: {type: String},
race: {type: String},
alignment: {type: String},
speed: {type: String},
// AC 10 + dex mod
AC: {type: String}, 
HP: {type: Number},

statStr: { type: Number },
statDex: { type: Number },
statCon: { type: Number },
statInt: { type: Number },
statWis: { type: Number },
statChar: { type: Number },

appearance: {type: String},
personalityTraits: {type: String},
ideals: {type: String},
bonds: {type: String},
flaws: {type: String},
background: {type: String}, 
});
const User = mongoose.model("character", characterSchema);
module.exports = User;