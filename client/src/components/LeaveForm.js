// client/src/components/LeaveForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = () => {
    const [formData, setFormData] = useState({
        employee: '',
        leaveType: 'Casual',
        startDate: '',
        endDate: '',
        reason: ''
    });
    const [message, setMessage] = useState('');

    // Handle changes for all form inputs
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submit the form data to the backend
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/leaves', formData)
            .then(response => {
                setMessage('Leave request submitted successfully!');
                // Clear form fields after successful submission
                setFormData({
                    employee: '',
                    leaveType: 'Casual',
                    startDate: '',
                    endDate: '',
                    reason: ''
                });
            })
            .catch(error => {
                console.error('Error submitting leave request:', error);
                setMessage('Error submitting leave request.');
            });
    };

    return (
        <div>
            <h2>Submit Leave Request</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employee"
                        value={formData.employee}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Leave Type:</label>
                    <select name="leaveType" value={formData.leaveType} onChange={handleChange}>
                        <option value="Casual">Casual</option>
                        <option value="Sick">Sick</option>
                        <option value="Earned">Earned</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Paternity">Paternity</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Reason:</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default LeaveForm;
