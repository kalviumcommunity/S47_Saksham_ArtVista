const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

// working routes
router.post('/posts', postController.createPost);
router.get('/posts/home', postController.getPostHomeFeed);

// to get and edit one post with id as a unique identifier
router.get('/get/:postId', postController.getEditPostDetails);
router.put('/posts/:postId', postController.updatePostDetails);

// To work on
router.get('/posts/:postId', postController.getPostUserFeed);
router.delete('/posts/:postId', postController.deletePost);

module.exports = router;
