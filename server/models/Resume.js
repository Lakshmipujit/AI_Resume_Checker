const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    filePath: String,

    extractedSkills: [String],

    score: Number,

}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);