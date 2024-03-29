const Post = require('../models/postmodel');
const { validatePost } = require('../validators/postValidator');

exports.createPost = async (req, res) => {
    try {
        const { username , title, description, image } = req.body;
        console.log(req.body)
        const { error } = validatePost({username ,title, description, image,  });
        if (error) { 
          return res.status(400).json({ message: error.details[0].message });
        }

        // Check if post already exists
        // const existingPost = await Post.findOne({ title, description, image });
        // if (existingPost) {
        //   return res.status(400).json({ message: 'This post already exists.' });
        // }
    
        const newPost = await Post.create({ 
            title, 
            description, 
            image,
            username
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

exports.updatePostDetails = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const { error } = validatePost({ title, description, image });
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        const post = await Post.findById(req.params.postId);
        if (!post) {
          return res.status(404).json({ message: 'Unable to update post' });
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