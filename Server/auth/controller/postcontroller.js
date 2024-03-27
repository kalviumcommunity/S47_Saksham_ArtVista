const Post = require('../models/postmodel');
const { validatePost } = require('../validators/postValidator');

exports.createPost = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const { error } = validatePost({ title, description, image });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const newPost = await Post.create({ title, description, image, user: req.user._id });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Unable to Get post data" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePostDetails = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const { error } = validatePost({ title, description, image, likes, dislikes });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Unable to update post" });
        }
        post.title = title;
        post.description = description;
        post.image = image;
        post.likes = likes;
        post.dislikes = dislikes;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Unable to delete post" });
        }
        await post.remove();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}