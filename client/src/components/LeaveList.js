// client/src/components/LeaveList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/leaves')
            .then(response => {
                setLeaves(response.data);
            })
            .catch(err => {
                console.error('Error fetching leave requests:', err);
                setError('Error fetching leave requests.');
            });
    }, []);

    return (
        <div>
            <h2>Leave Requests</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {leaves.length > 0 ? (
                <ul>
                    {leaves.map(leave => (
                        <li key={leave._id}>
                            <strong>
                                {leave.employee ? leave.employee.name : 'Unknown Employee'}
                            </strong>{' '}
                            requested <em>{leave.leaveType}</em> leave from{' '}
                            {new Date(leave.startDate).toLocaleDateString()} to{' '}
                            {new Date(leave.endDate).toLocaleDateString()}. Status: {leave.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No leave requests found.</p>
            )}
        </div>
    );
};

export default LeaveList;
