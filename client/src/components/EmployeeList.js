// client/src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    // Fetch employees from the backend API
    useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(err => {
                console.error('Error fetching employees:', err);
                setError('Error fetching employees.');
            });
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {employees.length > 0 ? (
                <ul>
                    {employees.map(emp => (
                        <li key={emp._id}>
                            <strong>{emp.name}</strong> – {emp.position} – ${emp.salary}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default EmployeeList;
