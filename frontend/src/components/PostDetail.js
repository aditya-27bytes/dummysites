import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await response.json();
      setPost(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${id}/like`, {
        method: 'PATCH'
      });
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
      const updatedPost = await response.json();
      setPost(updatedPost);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span style={{ color: '#667eea', fontWeight: 'bold' }}>By {post.author}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>•</span>
        <span>❤️ {post.likes} likes</span>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="tags" style={{ marginBottom: '1.5rem' }}>
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className="btn">
          ❤️ Like Post
        </button>
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Back to Home
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default PostDetail;

