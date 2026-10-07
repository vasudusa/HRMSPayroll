// server/routes/employee.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { verifyToken } = require('../middleware/auth');

// Get logged-in employee profile
router.get('/me', verifyToken, async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user.id });
        if (!employee) return res.status(404).json({ error: 'Employee profile not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employee profile' });
    }
});

// Update profile
router.put('/me', verifyToken, async (req, res) => {
    try {
        const updatedProfile = await Employee.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
        if (!updatedProfile) return res.status(404).json({ error: 'Employee profile not found' });
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ error: 'Error updating profile' });
    }
});

module.exports = router;
