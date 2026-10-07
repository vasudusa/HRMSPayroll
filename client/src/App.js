// client/src/App.js
import React from 'react';
import EmployeeList from './components/EmployeeList';
import LeaveForm from './components/LeaveForm';
import LeaveList from './components/LeaveList';

function App() {
    return (
        <div className="App">
            <header>
                <h1>HRMS Payroll Application</h1>
            </header>
            <main>
                {/* Existing Employee List Module */}
                <EmployeeList />
                <hr />
                {/* New Leave Management Module */}
                <LeaveForm />
                <LeaveList />
            </main>
        </div>
    );
}

export default App;
