const { userModel } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const asyncWrapper = require('../utils/asyncWrapper');
const validate = require('../utils/validate');

// User Sign Up
const signUp = asyncWrapper(async (req, res) => {
  // Validate input using express-validator
  validate(req);

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: false,
      message: 'Email already exists',
    });
  }

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    status: 'active',
  });

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET_KEY, {
    expiresIn: '24h',
  });

  // Return safe response
  return res.status(201).json({
    status: true,
    message: 'User registered successfully',
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
});

// User Sign In
const signIn = asyncWrapper(async (req, res) => {
  // Validate input
  validate(req);

  const { email, password } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: false,
      message: 'Email not found',
    });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      status: false,
      message: 'Invalid password',
    });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
    expiresIn: '24h',
  });

  return res.status(200).json({
    status: true,
    message: 'User signed in successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});

module.exports = {
  signUp,
  signIn,
};
