const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

router.post('/posts', postController.createPost);
router.get('/posts/:postId', postController.getPostDetails);
router.put('/posts/:postId', postController.updatePostDetails);
router.delete('/posts/:postId', postController.deletePost);

module.exports = router;
