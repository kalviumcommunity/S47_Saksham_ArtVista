const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

// working routes
router.post('/posts', postController.createPost);
router.get('/posts/home', postController.getPostHomeFeed);

// to get and edit one post with id as a unique identifier
router.get('/modify/:postId', postController.getEditPostDetails);
router.put('/modify/:postId', postController.updatePostDetails);
router.delete('/modify/:postId', postController.deletePost);

module.exports = router;
