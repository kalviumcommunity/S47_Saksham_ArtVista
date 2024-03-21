const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

router.post('/posts', postController.createPost);
router.get('/posts', postController.getPostDetails);
router.put('/posts/:postId', postController.updatePostDetails);
router.delete('/posts/:postId', postController.deletePost);

router.get('/posts/test', (req, res) => {
    console.log('GET /posts/test route reached');
    res.send('test');
})

module.exports = router;
