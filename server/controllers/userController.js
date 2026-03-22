const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create user helper
const createUser = async (req, res, role) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email is already taken' });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, isActive: user.isActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHR = (req, res) => createUser(req, res, 'hr');
exports.createEmployeeUser = (req, res) => createUser(req, res, 'employee');

exports.getAllHRs = async (req, res) => {
  try {
    const hrs = await User.find({ role: 'hr' }).select('-password');
    res.json(hrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const emps = await User.find({ role: 'employee' }).select('-password');
    res.json(emps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    
    // allow role/status change if sent
    if(req.body.role) user.role = req.body.role;
    if(req.body.isActive !== undefined) user.isActive = req.body.isActive;

    const updatedUser = await user.save();
    res.json({ id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role, isActive: updatedUser.isActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: 'Status updated', isActive: user.isActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
