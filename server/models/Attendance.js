// server/models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
