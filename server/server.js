// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//cors for production grade security
//const corsOptions = {
//    origin: 'https://your-production-domain.com',
//    optionsSuccessStatus: 200,
//};
//app.use(cors(corsOptions));

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Built-in middleware to parse JSON
app.use(cors()); // Enable CORS

// MongoDB connection URI (adjust for your environment, e.g., local MongoDB or Atlas)
const mongoURI = 'mongodb+srv://dusavasu:IduDvLFfFaHYV1qY@cluster0.3odm5.mongodb.net/'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple root route
app.get('/', (req, res) => {
    res.send('Welcome to the HRMS Payroll API');
});

// Import employee routes
const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

//Import leave routes
const leaveRoutes = require('./routes/leaves');
app.use('/api/leaves', leaveRoutes);

//Import auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Import payroll routes
const payrollRoutes = require('./routes/payroll');
app.use('/api/payroll', payrollRoutes);

//Import attendance routes
const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', attendanceRoutes);

//Import performance routes
const performanceRoutes = require('./routes/performance');
app.use('/api/performance', performanceRoutes);

//Import recruitement routes
const recruitmentRoutes = require('./routes/recruitment');
app.use('/api/recruitment', recruitmentRoutes);

//Import expense routes
const expenseRoutes = require('./routes/expenses');
app.use('/api/expenses', expenseRoutes);

//Import employeeprofile routes
const employeeRoutes = require('./routes/employee');
app.use('/api/employee', employeeRoutes);

const helmet = require('helmet');
app.use(helmet());

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
