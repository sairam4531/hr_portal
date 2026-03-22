const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number },
  joiningDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'on-leave', 'terminated'], default: 'active' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
