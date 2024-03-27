const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUserDetails);
router.put('/users/:userId', userController.updateUserDetails);

module.exports = router;
