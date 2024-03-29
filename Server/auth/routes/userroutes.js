const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.post('/logout', userController.logout);
router.put('/update/:userId', userController.updateUserDetails);
router.delete('/delete/:userId', userController.deleteUserDetails);

module.exports = router;
