// server/routes/payroll.js
const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');
const { verifyToken, requireRole } = require('../middleware/auth');

// Get all payroll records (HR/Admin only)
router.get('/', verifyToken, requireRole('Admin', 'HR'), async (req, res) => {
    try {
        const records = await Payroll.find().populate('employee');
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching payroll records' });
    }
});

// Create a payroll record (HR/Admin only)
router.post('/', verifyToken, requireRole('Admin', 'HR'), async (req, res) => {
    try {
        const payroll = new Payroll(req.body);
        const savedRecord = await payroll.save();
        res.status(201).json(savedRecord);
    } catch (err) {
        res.status(500).json({ error: 'Error creating payroll record' });
    }
});

// Update and Delete endpoints can be added similarly

module.exports = router;
