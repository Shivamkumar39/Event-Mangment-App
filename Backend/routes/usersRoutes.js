const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult } = require('express-validator');
const User = require('../Schema/users'); 
const server = express.Router();
const multer = require('../mibblewere/multer')

// Middleware
server.use(express.json());

const registerRouter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { username, email, password, mobile } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: secPass,
      mobile
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ authToken });
  } catch (err) {
    console.error('Error occurred while registering user:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if email format is valid
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const data = {
      user: {
        id: user.id,
        role: user.role,
      }
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ authToken, role: user.role });
  } catch (err) {
    console.error('Error occurred while logging in:', err.message);
    res.status(500).send('Internal Server Error');
  }
};

// Helper function to validate email format
function isValidEmail(email) {
  // Simple email format validation using regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


module.exports = {
  registerRouter, loginUser
};




