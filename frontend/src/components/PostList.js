import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (posts.length === 0) return <div className="empty">No posts yet. Create your first post!</div>;

  return (
    <div>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>
        Latest Posts
      </h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
            onClick={() => handlePostClick(post._id)}
          >
            <h3>{post.title}</h3>
            <div className="author">By {post.author}</div>
            <p className="content">
              {post.content.substring(0, 150)}
              {post.content.length > 150 ? '...' : ''}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="meta">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <div className="likes">
                ❤️ {post.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;

