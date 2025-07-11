const mongoose = require('mongoose');
const Post = require('../../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      if (mongoose.Types.ObjectId.isValid(req.query.category)) {
        filter.category = new mongoose.Types.ObjectId(req.query.category);
      } else {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
    }
    let query = Post.find(filter);
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    const posts = await query;
    const postsWithStringCategory = posts.map(post => ({
      ...post.toObject(),
      category: post.category ? post.category.toString() : undefined
    }));
    res.json(postsWithStringCategory);
  } catch (err) {
    console.error('getAllPosts error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const author = req.user && (req.user._id || req.user.id);
    const post = new Post({
      title,
      content,
      category,
      author,
      slug: title.toLowerCase().replace(/\s+/g, '-')
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const userId = req.user && (req.user._id || req.user.id);
    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const userId = req.user && (req.user._id || req.user.id);
    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 