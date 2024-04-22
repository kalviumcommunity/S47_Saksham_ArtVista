// const multer = require('multer');
// const path = require('path');
// const User = require('../models/usermodel');
// const jwt = require('jsonwebtoken');
// const secretKey = require('./config').secretKey;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const dest = path.join(__dirname, '..', 'storage', 'profilepic');
//         cb(null, dest);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         cb(null, 'profile-' + uniqueSuffix + ext);
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, 
// }).single('profileImage');

// exports.uploadProfileImage = (req, res) => {
//     upload(req, res, async (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ message: 'Upload Error', error: err.message });
//         } else if (err) {
//             console.error('Error uploading profile image:', err);
//             return res.status(500).json({ message: 'Upload Error', error: err.message });
//         }

//         const userToken = req.headers.authorization?.split(' ')[1];
//         if (!userToken) {
//             return res.status(401).json({ message: 'Unauthorized: Missing User Token' });
//         }

//         try {
//             const decodedToken = jwt.verify(userToken, secretKey);
//             const userEmail = decodedToken.email; 
            
//             const updatedUser = await User.findOneAndUpdate(
//                 { email: userEmail },
//                 { $set: { profileImage: req.file } },
//                 { new: true }
//             );

//             if (!updatedUser) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             return res.status(200).json({ message: 'Profile image uploaded successfully', user: updatedUser });
//         } catch (error) {
//             console.error('Error updating user with profile image:', error);
//             return res.status(500).json({ message: 'Server Error', error: error.message });
//         }
//     });
// };

const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
        const fileName = 'profile-' + uniqueSuffix + ext;
        cb(null, fileName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit (adjust as needed)
}).single('profileImage');

exports.uploadProfileImage = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Upload Error', error: err.message });
        } else if (err) {
            console.error('Error uploading profile image:', err);
            return res.status(500).json({ message: 'Upload Error', error: err.message });
        }

        const userToken = req.headers.authorization?.split(' ')[1];
        if (!userToken) {
            return res.status(401).json({ message: 'Unauthorized: Missing User Token' });
        }

        try {
            const decodedToken = jwt.verify(userToken, secretKey);
            const userEmail = decodedToken.email; 
            
            // Check if the user already has a profile image
            const existingUser = await User.findOne({ email: userEmail });

            if (existingUser.profileImage && fs.existsSync(existingUser.profileImage.path)) {
                // Delete the old profile image
                fs.unlink(existingUser.profileImage.path);
            }

            // Update user profileImage in the database
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
            return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
};
