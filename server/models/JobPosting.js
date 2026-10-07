// server/models/JobPosting.js
const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    department: { type: String },
    location: { type: String },
    postedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('JobPosting', JobPostingSchema);
