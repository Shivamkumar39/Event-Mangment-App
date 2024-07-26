const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const SecondAdmin = require('../Schema/admin');
const server = express.Router();
const fs = require('fs');
const path = require('path');

// Middleware
server.use(express.json());

// Register Second Admin
const AdmiRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, AdminCode, linkedIn, website, github, instagram, image } = req.body;


  admin = new SecondAdmin({
    username,
    email,
    AdminCode,
    linkedIn: linkedIn || '',  // Ensure default value
    website: website || '',    // Ensure default value
    github: github || '',      // Ensure default value
    instagram: instagram || '', // Ensure default value
    image: image || ''         // Ensure default value
  });


  try {
    await admin.save();

    const data = {
      admin: {
        id: admin.id
      }
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.status(201).json({authToken, message: 'Second Admin registered successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else if (err.code === 11000) {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Second Admin Login
const LoginAdmin = async (req, res) => {
  const errors = validationResult(req);
  try {
    const { email, AdminCode } = req.body;

    if (!email || !AdminCode) {
      return res.status(400).json({ message: 'Email and AdminCode are required' ,success:false});
    }

    const admin = await SecondAdmin.findOne({ email, AdminCode });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials',success:false });
    }

    const data = {
      admin: {
        id: admin._id,
        username: admin.username,
        organizername: admin.organizername,
        email: admin.email,
        image: admin.image || "",
        linkedIn: admin.linkedIn || "",
        website: admin.website || "",
        github: admin.github || "",
        instagram: admin.instagram || "",
      }
    };

    const jwtData = {
      admin:{
        id:admin._id
      }
    }

    const authToken = jwt.sign(jwtData, process.env.JWT_SECRET);

    res.json({ authToken, adminInfo: data.admin, success:true });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' ,success:false});
  }
};

// Get all Second Admins with limited fields
const GetSecondAdmin = async (req, res) => {
  try {
    // Fetch second admin profiles with limited fields
    const adminInfo = await SecondAdmin.find().select('username organizername email image linkedIn website github instagram');

    // Check if any admin profiles were found
    if (!adminInfo || adminInfo.length === 0) {
      return res.status(404).json({ error: 'No second admin profiles found' });
    }

    // Prepare response data
    const adminsData = adminInfo.map(admin => ({
      _id: admin._id,
      username: admin.username,
      organizername: admin.organizername,
      email: admin.email,
      image: admin.image,
      linkedIn: admin.linkedIn,
      website: admin.website,
      github: admin.github, 
      instagram: admin.instagram
    }));

    res.status(200).json(adminsData);
  } catch (err) {
    console.error('Error fetching second admins:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all Second Admins with full content
const GetSecondAdminfontent = async (req, res) => {
  try {
    //console.log(req.admin);
    const adminId = req.admin.id
    if(!adminId){
      return res.status(404).json({"message":"Id Not Found","success":false});
    }

    const findAdmin = await SecondAdmin.findById(adminId);

    if(!findAdmin){
      return res.status(404).json({"message":"User Not Found","success":false})
    }

    return res.status(200).json({data:findAdmin,"success":true})
    // res.json( adminInfo );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const updateadminProfile = async (req, res) => {
  const { username, organizername, email, linkedIn, website, github, instagram } = req.body;
  const newImage = req.file ? req.file.filename : null;

  try {
    // Retrieve the current admin profile
    const currentAdmin = await SecondAdmin.findById(req.admin.id);
    if (!currentAdmin) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Determine the image to be used
    let image = currentAdmin.image;
    if (newImage) {
      // If there's a new image, delete the old image if it exists
      if (image) {
        const oldImagePath = path.join(__dirname, 'uploads', image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log("Error deleting old image:", err);
          }
        });
      }
      image = newImage;
    }

    // Update the admin profile
    const adminInfo = await SecondAdmin.findByIdAndUpdate(
      req.admin.id,
      {
        username,
        organizername,
        email,
        image,
        linkedIn,
        website,
        github,
        instagram
      },
      { new: true }
    );

    if (!adminInfo) {
      return res.status(404).json({ error: 'Failed to update user' });
    }

    res.json(adminInfo);
  } catch (error) {
    console.log("Error updating admin profile:", error);
    res.status(500).json({ error: 'Internal Server Error in updating admin profile' });
  }
};


const imageDelete = async(req, res) => {
  const { filename } = req.params;
  console.log(filename);
  const filePath = path.join(__dirname, '../uploads', filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting the file' });
      }
      res.json({ message: 'File deleted successfully' });
    });
  });
};

module.exports = {
  LoginAdmin,
  AdmiRegister,
  GetSecondAdmin,
  updateadminProfile,
  GetSecondAdminfontent,
  imageDelete,
};
