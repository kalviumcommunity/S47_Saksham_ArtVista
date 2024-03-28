const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

// working without auth
router.post('/posts', postController.createPost);
router.get('/posts/Home', postController.getPostHomeFeed);

// To work on
router.get('/posts/:postId', postController.getPostUserFeed);
router.put('/posts/:postId', postController.updatePostDetails);
router.delete('/posts/:postId', postController.deletePost);

router.get('/posts/test', (req, res) => {
    console.log('GET /posts/test route reached');
    res.send('test');
})

module.exports = router;
