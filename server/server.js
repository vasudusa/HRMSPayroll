require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hrms-payroll';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the HRMS Payroll API');
});

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

const leaveRoutes = require('./routes/leaves');
app.use('/api/leaves', leaveRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const payrollRoutes = require('./routes/payroll');
app.use('/api/payroll', payrollRoutes);

const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', attendanceRoutes);

const performanceRoutes = require('./routes/performance');
app.use('/api/performance', performanceRoutes);

const recruitmentRoutes = require('./routes/recruitment');
app.use('/api/recruitment', recruitmentRoutes);

const expenseRoutes = require('./routes/expenses');
app.use('/api/expenses', expenseRoutes);

const employeeProfileRoutes = require('./routes/employee');
app.use('/api/employee', employeeProfileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
