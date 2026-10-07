// server/routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { verifyToken, requireRole } = require('../middleware/auth');

// Employee submits expense
router.post('/', verifyToken, async (req, res) => {
    try {
        const expense = new Expense({ ...req.body, employee: req.user.id });
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(500).json({ error: 'Error submitting expense' });
    }
});

// HR/Admin can update status
router.patch('/:id/status', verifyToken, requireRole('HR', 'Admin'), async (req, res) => {
    try {
        const { status } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ error: 'Expense not found' });
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json({ error: 'Error updating expense status' });
    }
});

module.exports = router;
