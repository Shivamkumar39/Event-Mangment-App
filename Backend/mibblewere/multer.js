const multer  = require('multer')
const express = require('express')

const server = express();
// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // File renaming logic
    },
  });
  
  
  // File filter to accept only images
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter, dest: 'uploads/' });
  
  
  // Endpoint to upload an image
server.post('/uploads', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }
    res.json({ img: req.file.filename});
  });