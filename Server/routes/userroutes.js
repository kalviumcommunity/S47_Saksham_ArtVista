const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

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

// To work on..
router.put('/update/:userId', userController.updateUserDetails);
router.delete('/delete/:userId', userController.deleteUserDetails);

module.exports = router;
