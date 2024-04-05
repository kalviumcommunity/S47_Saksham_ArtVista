const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../validators/uservalidator');

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

exports.signUp = async (req, res) => {
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

exports.logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, secretKey, { expiresIn: '1h' });
        res.cookie('sessionToken', token, { maxAge: 3600000, httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('sessionToken');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


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

exports.checkGoogleUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(214).json({ message: 'User not found' });
        }

        if (user.username) {
            res.status(200).json({message: user.username})
        } else {
            res.status(215).json({message: 'Username in missing for this email'})
        }
    } catch (error) {
        console.error('Error checking Google user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.setNewUserName = async (req, res) => {
    try {
        const { username, email } = req.body;
        console.log(req.body);
        const existinguser = await User.findOne({ username });
        if (existinguser) {
            return res.status(400).json({ message: 'User associated with this email already exists' });
        }
        const existingmail = await User.findOne({ email });
        if (existingmail) {
            const newUser = await User.findOneAndUpdate({ email }, { username });
            res.status(203).json(newUser);
        } else {
            const newUser = await User.create({
                username: username,
                email: email
            })
            res.status(201).json(newUser);
        }
    } catch {

    }
}