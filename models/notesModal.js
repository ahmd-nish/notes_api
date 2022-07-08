const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
	Title: { type: String, required: true },
	Description: { type: String, required: false },
	Content: { type: String, required: false },
},{
    timestamps: true
});

module.exports = mongoose.model("notes", notesSchema);