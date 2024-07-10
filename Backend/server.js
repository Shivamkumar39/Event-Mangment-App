const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { body } = require('express-validator');
const {registerRouter, loginUser} = require('./routes/usersRoutes'); 
require('dotenv').config();

const server = express();
const PORT = process.env.PORT || 9999;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dbname', {   //mongodb+srv://shivamkumar098798:dYAPQ3FWQydd1JSX@cluster0.2yzapfm.mongodb.net/  

}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

//middlewere
server.use(cors());
server.use(express.json());


// Middleware to fetch user from JWT token
const JWTToken = (req, res, next) => {
    const authToken = req.header('authToken')

    if (!authToken) {
        return res.status(401).json({ error: 'please provide valid token' })
    }

    try {
        const data = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = data.user; // Assuming 'user' is the key in your JWT payload
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).send({ error: 'Invalid token or unauthorized access' });
    }

}
module.exports = JWTToken







// path all rootes
server.post('/register', [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),
    body('mobile', 'Enter a valid mobile').isLength({ min: 10 })

  ], registerRouter);
server.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 6 }),
  ], loginUser);
  





server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });




