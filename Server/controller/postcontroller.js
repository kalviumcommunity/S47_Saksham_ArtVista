const Post = require('../models/postmodel');
const { validatePost } = require('../validators/postValidator');
const jwt = require('jsonwebtoken');
const secretKey = require('./config').secretKey;

exports.createPost = async (req, res) => {
    try {
        const { email , title, description, image } = req.body;
        console.log(req.body)
        const { error } = validatePost({email ,title, description, image });
        if (error) { 
          return res.status(400).json({ message: error.details[0].message });
        }    
        const newPost = await Post.create({ 
            title, 
            description, 
            image,
            email
        }); 
        res.status(201).json(newPost);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.getPostHomeFeed = async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPostUserFeed = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Unable to Get post data" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// getting one specific post

exports.getEditPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.status(200).json(post);
      } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

// modifying an existing post
exports.updatePostDetails = async (req, res) => {
  try {
    const { title, description, image, email } = req.body;
    const { error } = validatePost({ title, description, image, email });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }

    // Verify token with Bearer scheme
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.email !== email) {
        return res.status(403).json({ message: 'Unauthorized to update this post' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    post.title = title;
    post.description = description;
    post.image = image;

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
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await post.remove();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}