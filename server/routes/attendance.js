// server/routes/attendance.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { verifyToken } = require('../middleware/auth');

// Record check-in (any authenticated employee)
router.post('/checkin', verifyToken, async (req, res) => {
    try {
        const attendance = new Attendance({
            employee: req.user.id, // assuming user is an employee
            checkIn: new Date(),
        });
        const savedAttendance = await attendance.save();
        res.status(201).json(savedAttendance);
    } catch (err) {
        res.status(500).json({ error: 'Error during check-in' });
    }
});

// Record check-out (update latest attendance record)
router.post('/checkout', verifyToken, async (req, res) => {
    try {
        const attendance = await Attendance.findOne({
            employee: req.user.id,
            checkOut: { $exists: false }
        }).sort({ checkIn: -1 });
        if (!attendance) {
            return res.status(400).json({ error: 'No active check-in found' });
        }
        attendance.checkOut = new Date();
        const updatedAttendance = await attendance.save();
        res.json(updatedAttendance);
    } catch (err) {
        res.status(500).json({ error: 'Error during check-out' });
    }
});

module.exports = router;
