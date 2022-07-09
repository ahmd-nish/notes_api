const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
	Title: { type: String, required: true },
	Description: { type: String, required: false },
	Content: { type: String, required: false },
	SubId: { type: String, required: true },
},{
    timestamps: true
});

module.exports = mongoose.model("notes", notesSchema);