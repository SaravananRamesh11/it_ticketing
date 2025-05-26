const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

// Add new employee endpoint with password hashing
const register_user = async (req, res) => {
  try {
    const { employeeId, employeeName, password, role, email } = req.body;

    console.log(req.body);
    console.log(`${employeeId},${employeeName}, ${password}, ${role},${email}`);

    // Basic validation
    if (!employeeId || !employeeName || !password || !role || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if employee ID already exists
    const existingUserById = await User.findOne({ employeeId });
    if (existingUserById) {
      return res.status(400).json({ message: 'Employee ID already exists' });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new employee with hashed password
    const newEmployee = new User({
      employeeName,
      employeeId,
      email,
      role,
      password: hashedPassword // Store the hashed password
    });

    // Save to database
    const savedEmployee = await newEmployee.save();

    // Return response (without password)
    const { password: _, ...employeeData } = savedEmployee.toObject();
    res.status(201).json({
      message: 'Employee added successfully',
      employee: employeeData
    });

  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register_user };