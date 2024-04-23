const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../validators/uservalidator');
const secretKey = require('./config').secretKey;


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
            const token = jwt.sign({ id: newUser._id }, secretKey);
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
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, secretKey);
        // res.cookie('sessionToken', token, { maxAge: 3600000, httpOnly: true });
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
        const decoded = jwt.verify(token, secretKey);
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

// google controllers

exports.checkGoogleUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
            // return res.status(214).json({ message: 'User not found' });
            const newUser = await User.create({ email });
            const token = jwt.sign({ id: newUser._id, email: newUser.email}, secretKey);
            res.status(214).json({message: 'Username in missing for this email', token: token});
        }
        else if (user.username) {
            const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, secretKey);
            res.status(200).json({message: user.username, token: token});

        } else {
            const token = jwt.sign({ id: user._id, email: user.email }, secretKey);
            res.status(215).json({message: 'Username in missing for this email', token: token});
        }
    } catch (error) {
        console.error('Error checking Google user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// username management

exports.setNewUserName = async (req, res) => {
    try {
        const { username, email } = req.body;
        console.log(req.body);
        const existingmail = await User.findOne({ email });
        if (existingmail) {
            if (username == existingmail.username) {
                res.status(400).json({message: 'This one is already your username'});
            } else {
                const existinguser = await User.findOne({ username });
                if (existinguser) {
                    return res.status(400).json({ message: 'User associated with this email already exists' });
                }
                else {
                    const newUser = await User.findOneAndUpdate({ email }, { username });
                    const token = jwt.sign({ id: newUser._id, email: newUser.email, username: newUser.username }, secretKey);
                    res.status(202).json({user: newUser, token: token});
                }
            }
        } else {
            const newUser = await User.create({
                username: username,
                email: email
            })
            res.status(201).json({user: newUser});
        }
    } catch {

    }
}

exports.availableUsernames = async (req, res) => {
    try {
        const usernames = await User.distinct('username');
        res.status(200).json(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getPostUser = async (req, res) => {
    try {
      const users = await User.find({}, 'email username');
      if (users.length > 0) {
        const userList = users.map(user => ({
          email: user.email,
          username: user.username || 'No username set'
        }));
        res.status(200).json({ users: userList });
      } else {
        res.status(204).json({ message: 'No users found' });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };  

// user verification
exports.verifyUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token is missing or invalid' });
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        const { email } = decoded;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ message: 'User verified successfully', user });
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

