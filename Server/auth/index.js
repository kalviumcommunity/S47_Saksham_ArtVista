const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userroutes');
const postRoutes = require('./routes/postroutes');
const dotenv = require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
// crypto
const crypto = require('crypto');
const generateSecretKey = () => {
    return crypto.randomBytes(6).toString('hex');
};
const secretKey = generateSecretKey();
console.log('Secret Key:', secretKey);


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET || secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});