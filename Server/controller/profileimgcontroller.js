const multer = require('multer');
const path = require('path');
const User = require('../models/usermodel');

// Multer configuration for profile image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile-images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'profile-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage }).single('profileImage');

// Controller function to handle profile image upload
exports.uploadProfileImage = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Multer error', error: err });
        } else if (err) {
            return res.status(500).json({ message: 'Error uploading profile image', error: err });
        }

        // Profile image uploaded successfully, update user document with image details
        const { originalname, mimetype, filename, size } = req.file;
        const profileImage = {
            originalName: originalname,
            mimeType: mimetype,
            filename: filename,
            size: size
        };

        try {
            // Update the user document with the uploaded profile image details
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id, // Assuming req.user contains the authenticated user's ID
                { profileImage },
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
