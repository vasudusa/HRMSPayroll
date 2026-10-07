// server/routes/performance.js
const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');
const { verifyToken, requireRole } = require('../middleware/auth');

// Create a performance review (Manager or HR)
router.post('/', verifyToken, requireRole('Manager', 'HR'), async (req, res) => {
    try {
        const review = new Performance(req.body);
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(500).json({ error: 'Error creating performance review' });
    }
});

// Get reviews for an employee (restricted to the employee, HR, or Manager)
router.get('/employee/:employeeId', verifyToken, async (req, res) => {
    try {
        const reviews = await Performance.find({ employee: req.params.employeeId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching performance reviews' });
    }
});

module.exports = router;
