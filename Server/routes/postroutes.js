const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

// Post creation
router.post('/posts', postController.createPost);

// Home feed
router.get('/posts/home', postController.getPostHomeFeed);

// Post modifications 
router.get('/modify/:postId', postController.getEditPostDetails);
router.put('/modify/:postId', postController.updatePostDetails);

// Delete post 
router.delete('/modify/:postId', postController.deletePost);

// Further plans of getting the profile image here
// is still under d
module.exports = router;
