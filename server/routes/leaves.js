// server/routes/leaves.js
const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');

/**
 * @route   GET /api/leaves
 * @desc    Retrieve all leave requests (with employee details populated)
 */
router.get('/', async (req, res) => {
    try {
        const leaves = await LeaveRequest.find().populate('employee');
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching leave requests' });
    }
});

/**
 * @route   GET /api/leaves/:id
 * @desc    Retrieve a single leave request by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const leave = await LeaveRequest.findById(req.params.id).populate('employee');
        if (!leave) return res.status(404).json({ error: 'Leave request not found' });
        res.json(leave);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching the leave request' });
    }
});

/**
 * @route   POST /api/leaves
 * @desc    Create a new leave request
 */
router.post('/', async (req, res) => {
    try {
        const { employee, leaveType, startDate, endDate, reason } = req.body;
        const newLeave = new LeaveRequest({ employee, leaveType, startDate, endDate, reason });
        const savedLeave = await newLeave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(500).json({ error: 'Server error creating leave request' });
    }
});

/**
 * @route   PUT /api/leaves/:id
 * @desc    Update an existing leave request (e.g., modify dates or reason while pending)
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedLeave = await LeaveRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedLeave) return res.status(404).json({ error: 'Leave request not found' });
        res.json(updatedLeave);
    } catch (err) {
        res.status(500).json({ error: 'Server error updating the leave request' });
    }
});

/**
 * @route   PATCH /api/leaves/:id/status
 * @desc    Update the status of a leave request (approve/reject)
 */
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status update' });
        }
        const updatedLeave = await LeaveRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedLeave) return res.status(404).json({ error: 'Leave request not found' });
        res.json(updatedLeave);
    } catch (err) {
        res.status(500).json({ error: 'Server error updating leave status' });
    }
});

/**
 * @route   DELETE /api/leaves/:id
 * @desc    Delete (or cancel) a leave request
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedLeave = await LeaveRequest.findByIdAndDelete(req.params.id);
        if (!deletedLeave) return res.status(404).json({ error: 'Leave request not found' });
        res.json({ message: 'Leave request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error deleting the leave request' });
    }
});

module.exports = router;
