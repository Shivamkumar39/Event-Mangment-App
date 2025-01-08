const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
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
    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Prepare user data for JWT payload and response
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      mobile: user.mobile
    };

    // Generate JWT
    const authToken = jwt.sign(userInfo, process.env.JWT_SECRET);

    // Send response
    res.json({
      authToken,
      userInfo, // Returning the necessary user details
    });
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
  // if (mobile.length !== 10) {
  //   return res.status(400).json({ error: 'Invalid mobile number' });
  // }
  const { username, email, mobile, deleteImage } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const emailExists = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (emailExists) return res.status(400).json({ error: 'Email already in use' });

    const updateData = { username, email, mobile };
    if (deleteImage === 'true') updateData.image = null;
    if (image) updateData.image = image;

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchusers = async (req, res) => {

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }
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
      image: user.image, // Assuming image file name or path is stored in DB.
    };

    const authToken = jwt.sign(userInfo, process.env.JWT_SECRET);
    res.json({
      authToken,
      userInfo, // Returning the necessary user details
    });
    //res.json(userInfo);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  registerRouter, loginUser, updateProfile, fetchusers
};




