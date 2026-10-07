// server/routes/recruitment.js
const express = require('express');
const router = express.Router();
const JobPosting = require('../models/JobPosting');
const Candidate = require('../models/Candidate');
const { verifyToken, requireRole } = require('../middleware/auth');

// CRUD for job postings (Admin/HR only)
router.post('/jobs', verifyToken, requireRole('Admin', 'HR'), async (req, res) => {
    try {
        const job = new JobPosting(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(500).json({ error: 'Error creating job posting' });
    }
});

// Candidates applying to a job (open to public or require login)
router.post('/apply', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        const savedCandidate = await candidate.save();
        res.status(201).json(savedCandidate);
    } catch (err) {
        res.status(500).json({ error: 'Error applying for job' });
    }
});

// Additional endpoints for updating candidate status, listing jobs, etc.

module.exports = router;
