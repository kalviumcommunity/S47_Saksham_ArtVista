const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

// working routes
router.post('/posts', postController.createPost);
router.get('/posts/home', postController.getPostHomeFeed);
router.get('/modify/:postId', postController.getEditPostDetails);
router.put('/modify/:postId', postController.updatePostDetails);
router.delete('/modify/:postId', postController.deletePost);

// Further plans of getting the profile image here
// is still under d
module.exports = router;
