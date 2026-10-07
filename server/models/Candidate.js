// server/models/Candidate.js
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    resumeUrl: { type: String },
    jobApplied: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting' },
    status: { type: String, enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'], default: 'Applied' },
    appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Candidate', CandidateSchema);
