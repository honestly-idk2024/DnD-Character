const mongoose = require("mongoose");
// User model schema
const characterSchema = new mongoose.Schema({
id: {type: String, unqiue: true },
characterName: { type: String },
level: { type: Number },
});
const User = mongoose.model("character", characterSchema);
module.exports = User;