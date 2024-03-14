const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userroutes');
const postRoutes = require('./routes/postroutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production if using HTTPS
}));

// Database connection
mongoose.connect('mongodb+srv://sparkysaksham:sparkysg@artvista1.a6tplzs.mongodb.net/?retryWrites=true&w=majority&appName=ArtVista1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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