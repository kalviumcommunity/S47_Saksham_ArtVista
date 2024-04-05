const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.post('/logout', userController.logout);
router.put('/update/:userId', userController.updateUserDetails);
router.delete('/delete/:userId', userController.deleteUserDetails);

// google setusername route
router.post('/checkgoogleuser', userController.checkGoogleUser);
router.post('./setuser', userController.setNewUserName);

module.exports = router;
