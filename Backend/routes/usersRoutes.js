const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult } = require('express-validator');
const User = require('../Schema/users'); 
const server = express.Router();

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
        email: user.email,
        username: user.username, // Add other user details as needed
        mobile: user.mobile,
        image: user.image
      }
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ authToken, userInfo: data.user });
    // console.log("🚀 ~ loginUser ~ user:", user)
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



const updateProfile = async (req, res) => {
  const { username, email, mobile } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    
    // Find and update the user by id
    let userInfo = await User.findByIdAndUpdate(req.user.id, {
      username: username,
      email: email,
      mobile: mobile,
      image: image
    }, { new: true }); // { new: true } ensures you get the updated document

    // Check if user was found and updated
    if (!userInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user information
    res.json(userInfo);
  } catch (err) {
    console.error('Error occurred while updating profile:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchusers = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains authenticated user details

    // Fetch user profile from database by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare response data
    const userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      image: user.image, // Assuming you store image file name or path in user document
    };

    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  registerRouter, loginUser, updateProfile, fetchusers
};




