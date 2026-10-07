// server/models/Performance.js
const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    reviewPeriod: { type: String, required: true },
    goals: [{ description: String, achieved: Boolean }],
    feedback: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Performance', PerformanceSchema);
