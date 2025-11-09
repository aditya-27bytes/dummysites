const express = require('express');
const router = express.Router();

// Helper function to create post object
function createPost(data) {
  return {
    _id: String(global.postIdCounter++),
    title: data.title,
    content: data.content,
    author: data.author || 'Anonymous',
    tags: data.tags || [],
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// GET all posts
router.get('/', (req, res) => {
  try {
    // Sort by createdAt descending
    const sortedPosts = [...global.posts].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(sortedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single post by ID
router.get('/:id', (req, res) => {
  try {
    const post = global.posts.find(p => p._id === req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new post
router.post('/', (req, res) => {
  try {
    const newPost = createPost(req.body);
    global.posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a post
router.put('/:id', (req, res) => {
  try {
    const postIndex = global.posts.findIndex(p => p._id === req.params.id);
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = global.posts[postIndex];
    
    if (req.body.title != null) {
      post.title = req.body.title;
    }
    if (req.body.content != null) {
      post.content = req.body.content;
    }
    if (req.body.author != null) {
      post.author = req.body.author;
    }
    if (req.body.tags != null) {
      post.tags = req.body.tags;
    }
    
    post.updatedAt = new Date().toISOString();
    global.posts[postIndex] = post;
    
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LIKE a post (increment likes)
router.patch('/:id/like', (req, res) => {
  try {
    const postIndex = global.posts.findIndex(p => p._id === req.params.id);
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    global.posts[postIndex].likes += 1;
    global.posts[postIndex].updatedAt = new Date().toISOString();
    
    res.json(global.posts[postIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a post
router.delete('/:id', (req, res) => {
  try {
    const postIndex = global.posts.findIndex(p => p._id === req.params.id);
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    global.posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

