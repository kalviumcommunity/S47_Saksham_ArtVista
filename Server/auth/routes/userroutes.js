const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUserDetails);
router.put('/users/:userId', userController.updateUserDetails);

router.delete('/users/:userId', userController.deleteUserDetails);

// router.get('/users/test', (req, res) => {
//     console.log('GET /users/test route reached');
//     res.send('test');
// });

module.exports = router;
