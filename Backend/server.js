const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { body, check } = require('express-validator');
const { registerRouter, loginUser, updateProfile, fetchusers } = require('./routes/usersRoutes');
const path = require('path');
const { AdmiRegister, LoginAdmin, GetSecondAdmin, updateadminProfile, GetSecondAdminfontent, imageDelete } = require('./routes/adminRoutes');
const { postevent, FetchDataById, EventOnging, EventUpcoming, Eventcompleted, updateEvent } = require('./routes/eventRoutes');
const { createQuiz, updateQuiz, startQuizAfterPayment, getLeaderboard } = require('./routes/quizeesRouter');




require('dotenv').config();
const server = express();
const PORT = process.env.PORT || 9999;





// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbname', {   // Use your actual MongoDB URI
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});




// Middleware
server.use(cors());
server.use(express.json());

// JWT Middleware
const JWTToken = (req, res, next) => {
    const token = req.header('authToken') || req.header('Authorization');
    const authToken = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token;
    // const authToken = req.header('authToken')?.replace('Bearer ', ''); //?.replace('Bearer ', '')
    console.log("token id:", authToken);

    if (!authToken) {
        return res.status(401).json({ error: 'Please provide a valid token' });
    }

    try {
        const data = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = data || null;
        req.admin = data.admin || null;
        next();




    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).send({ error: 'Invalid token or unauthorized access' });
    }
};


// Multer Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // File renaming logic
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// users Routes
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

server.post('/updateProfile', JWTToken, upload.single('image'), updateProfile);
server.get('/profilepage', JWTToken, fetchusers)







// Admin Routes
server.post('/AdmiRegister', AdmiRegister)
server.post('/admin-Login', LoginAdmin)
server.get('/getAdminProfile', GetSecondAdmin)
server.get('/adminprofileFrontent', JWTToken, GetSecondAdminfontent)
server.post('/updateadminProfile', JWTToken, upload.single('image'), updateadminProfile)



//event paost and fetch
server.post(
    '/postevent',
    JWTToken,
    upload.single('image'), postevent)

server.get('/events', JWTToken, FetchDataById)

server.get('/events/ongoing', EventOnging)
server.get('/events/upcoming', EventUpcoming)
server.get('/events/completed', Eventcompleted)
server.put('/events/update/:id', JWTToken, updateEvent);

//quize
server.post(
    '/createQuizze',
    [
        body("title").notEmpty(),
        body("questions").isArray({ min: 1 }),
        body("startTime").notEmpty(),
        body("endTime").notEmpty(),
        body("price").isNumeric(),
    ],
    createQuiz
);

// Update Quiz
server.put("/update/:id", updateQuiz);

// Start Quiz After Payment
server.post("/start", startQuizAfterPayment);

// Get Leaderboard
server.get("/leaderboard/:quizId", getLeaderboard);



server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
