const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage (temporary - replace with MongoDB later)
global.posts = [];
global.postIdCounter = 1;

console.log('Using in-memory storage (no MongoDB required)');
console.log('Note: Data will be lost when server restarts');

// Routes
const postRoutes = require('./routes/posts-memory');
app.use('/api/posts', postRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Dummy Fullstack API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

