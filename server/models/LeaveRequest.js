// server/models/LeaveRequest.js
const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // assuming Employee model exists
        required: true,
    },
    leaveType: {
        type: String,
        enum: ['Casual', 'Sick', 'Earned', 'Maternity', 'Paternity', 'Other'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Pending',
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);
