// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/usermodel');
// const { validateUser } = require('../validators/uservalidator');

// exports.createUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const { error } = validateUser({ username, email, password });
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User associated with this email already exists' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({ username, email, password: hashedPassword });
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.getUserDetails = async (req, res) => {
//     try {
//         const userDetails = req.user;
//         res.status(200).json(userDetails);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.updateUserDetails = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const { error } = validateUser({ username, email, password });
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }
//         req.user.username = username;
//         req.user.email = email;
//         req.user.password = password;
//         await req.user.save();
//         res.status(200).json(req.user);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const { validateUser } = require('../validators/uservalidator');

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { error } = validateUser({ username, email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User associated with this email already exists' });
        }

        // Sign the user data into a JWT token
        const token = jwt.sign({ username, email, password }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header
        const decoded = jwt.verify(token, secretKey, { expiresIn: '1h' });
        const userDetails = decoded;
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header
        const decoded = jwt.verify(token, secretKey, { expiresIn: '1h' });
        const userDetails = decoded;

        const { username, email, password } = req.body;
        const { error } = validateUser({ username, email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Update the user details using the decoded token data
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};