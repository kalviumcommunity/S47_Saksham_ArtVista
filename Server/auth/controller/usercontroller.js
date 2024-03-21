const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
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
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: hashedPassword });
            res.status(201).json(newUser);
            const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// exports.getUserDetails = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]; 
//         const decoded = jwt.verify(token, secretKey, { expiresIn: '1h' });
//         const userDetails = decoded;
//         res.status(200).json(userDetails);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

exports.getUserDetails = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, secretKey, { expiresIn: '1h' });
        const userDetails = decoded;
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        const decoded = jwt.verify(token, secretKey, { expiresIn: '1h' });
        const userDetails = decoded;

        const { username, email, password } = req.body;
        const { error } = validateUser({ username, email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        res.status(200).json({ message: 'User details updated successfully', userDetails });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUserDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
