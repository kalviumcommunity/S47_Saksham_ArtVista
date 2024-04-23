const multer = require('multer');
const path = require('path');
const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const secretKey = require('./config').secretKey;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, '..', 'storage', 'profilepic');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'profile-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage }).single('profileImage');

exports.uploadProfileImage = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Multer error', error: err });
        } else if (err) {
            return res.status(500).json({ message: 'Error uploading profile image', error: err });
        }

        const userToken = req.headers.authorization;
        if (!userToken) {
            return res.status(401).json({ message: 'Unauthorized: Missing User Token' });
        }

        try {
            const decodedToken = jwt.verify(userToken, secretKey);
            const userEmail = decodedToken.email; 
            const updatedUser = await User.findOneAndUpdate(
                { email: userEmail },
                { $set: { profileImage: req.file } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'Profile image uploaded successfully', user: updatedUser });
        } catch (error) {
            console.error('Error updating user with profile image:', error);
            return res.status(500).json({ message: 'Error updating user with profile image', error: error });
        }
    });
};
