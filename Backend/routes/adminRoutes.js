const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const SecondAdmin = require('../Schema/admin');


// Register Second Admin
const AdmiRegister = async (req, res) => {
    const { username, email, AdminCode } = req.body;

    const adminInfo = new SecondAdmin({
        username,
        email,
        AdminCode
    });

    try {
        await adminInfo.save();
        res.status(201).send('Second Admin registered');
    } catch (err) {
        res.status(400).send(err);
    }
}; //server.post('/register-second-admin',


// Second Admin Login
const LoginAdmin = async (req, res) => {
    try {
      const { email, AdminCode } = req.body;
  
      // Log incoming data
      console.log('Received email:', email);
      console.log('Received AdminCode:', AdminCode);
  
      // Check if email and AdminCode are provided
      if (!email || !AdminCode) {
        return res.status(400).json({ message: 'Email and AdminCode are required' });
      }
  
      // Find admin info in the database
      const adminInfo = await SecondAdmin.findOne({ email, AdminCode });
  
      // Log the result of the query
      console.log('Found adminInfo:', adminInfo);
  
      if (adminInfo) {
        const { username, _id } = adminInfo;
  
        // Generate a token
        const authtoken = jwt.sign(
          { _id: _id.toString(), email }, // Payload
          'your_jwt_secret', // Secret key, make sure to store this securely
          { expiresIn: '1h' } // Token expiration time
        );
  
        res.status(200).json({
          message: 'Login successful',
          id: _id,
          username,
          email,
          authToken: authtoken,
          // Add any other data you want to send
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



// Get all Second Admins
const GetSecondAdmin = async (req, res) => {
    try {
        const adminInfo = await SecondAdmin.find().select('username email image admincode');
        res.status(200).json(adminInfo);
    } catch (err) {
        res.status(500).send(err);
    }
};


module.exports = {
    LoginAdmin, AdmiRegister, GetSecondAdmin
};