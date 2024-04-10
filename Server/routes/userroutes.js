const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const profileimgcontroller = require('../controller/profileimgcontroller');

// local setup routes
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.post('/logout', userController.logout);

// google setusername route
router.post('/checkuser', userController.checkGoogleUser);
router.post('/setuser', userController.setNewUserName);
router.get('/useravail', userController.availableUsernames);

// getting username by email for home feed
router.post('/getpostuser', userController.getPostUser);

// verificaion api
router.post('/verifyuser', userController.verifyUser);

//profile pic upload
router.post('/imgupload', profileimgcontroller.uploadProfileImage);

// To work on..
router.put('/update/:userId', userController.updateUserDetails);
router.delete('/delete/:userId', userController.deleteUserDetails);

module.exports = router;
