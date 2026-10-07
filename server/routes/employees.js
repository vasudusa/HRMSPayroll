// routes/employees.js
const express = require('express');
const router = express.Router();

// Import the Employee model
const Employee = require('../models/Employee');

/**
 * @route   GET /api/employees
 * @desc    Retrieve all employees
 */
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching employees' });
    }
});

/**
 * @route   GET /api/employees/:id
 * @desc    Retrieve a single employee by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching the employee' });
    }
});

/**
 * @route   POST /api/employees
 * @desc    Create a new employee
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        const newEmployee = new Employee({ name, email, position, salary });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(500).json({ error: 'Server error while creating the employee' });
    }
});

/**
 * @route   PUT /api/employees/:id
 * @desc    Update an existing employee
 */
router.put('/:id', async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, email, position, salary },
            { new: true } // return the updated document
        );
        if (!updatedEmployee) return res.status(404).json({ error: 'Employee not found' });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ error: 'Server error while updating the employee' });
    }
});

/**
 * @route   DELETE /api/employees/:id
 * @desc    Delete an employee
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error while deleting the employee' });
    }
});

module.exports = router;
