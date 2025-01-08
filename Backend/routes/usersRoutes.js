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
    const jwtuserdata = {
      id: user.id,
      email: user.email,
      username: user.username,
      mobile: user.mobile,
      image: user.image
    };

    // Generate JWT
    const authToken = jwt.sign(jwtuserdata, process.env.JWT_SECRET);

    // Send response
    res.json({
      authToken,
      userInfo: jwtuserdata, // Returning the necessary user details
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
  const { username, email, mobile, deleteImage } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    
    // Find and update the user by id
    // let userInfo = await User.findByIdAndUpdate(req.user.id, {
    //   username: username,
    //   email: email,
    //   mobile: mobile,
    //   image: image
      
    // }, { new: true });
    const emailExists = await User.findOne({ email: email, _id: { $ne: req.user.id } });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const updateData = {

      username: username,
      email: email,
      mobile: mobile,
    }// { new: true } ensures you get the updated document
    if (deleteImage === 'true') {
      updateData.image = null; // Set image to null if deleteImage flag is true
    } else if (!userInfo.image && image) {
      updateData.image = image; // Only update the image if it is not already present and deleteImage is not true
    } else if (image) {
      updateData.image = image; // Update the image if a new image is provided
    }


    userInfo = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
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




