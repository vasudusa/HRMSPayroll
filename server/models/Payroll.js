// server/models/Payroll.js
const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    netSalary: { type: Number },
    payDate: { type: Date, default: Date.now },
});

// Calculate net salary before saving
PayrollSchema.pre('save', function (next) {
    this.netSalary = this.basicSalary + this.allowances - this.deductions - this.tax;
    next();
});

module.exports = mongoose.model('Payroll', PayrollSchema);
