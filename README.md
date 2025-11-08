# Dummy Fullstack Website

A simple fullstack blog application built with React, Node.js, Express, and MongoDB.

## Features

- ✨ Create, read, update, and delete blog posts
- 👤 Author attribution
- 🏷️ Tag system
- ❤️ Like functionality
- 📱 Responsive design
- 🎨 Modern UI with gradient background

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Project Structure

```
dummysites/
├── backend/
│   ├── models/
│   │   └── Post.js          # Post schema
│   ├── routes/
│   │   └── posts.js         # REST API routes
│   ├── .env                 # Environment variables
│   ├── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostList.js      # Display all posts
│   │   │   ├── CreatePost.js    # Create new post
│   │   │   └── PostDetail.js    # View single post
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## REST API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `PATCH /api/posts/:id/like` - Like a post
- `DELETE /api/posts/:id` - Delete post

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Install MongoDB
If you don't have MongoDB installed locally:
- **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Make sure MongoDB is running
# If using local MongoDB, start it with:
# mongod (on separate terminal)

# Start the backend server
npm start

# Or use nodemon for development (auto-reload)
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Usage

1. **View Posts**: The homepage displays all blog posts in a card grid
2. **Create Post**: Click "Create Post" in the navigation to write a new post
3. **View Details**: Click on any post card to view its full content
4. **Like Post**: Click the heart button on the detail page to like a post
5. **Delete Post**: Click the delete button on the detail page to remove a post

## Configuration

### Backend Environment Variables

Edit `backend/.env` to configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dummysite
```

For MongoDB Atlas, replace with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dummysite
```

## Development Tips

- Backend runs on port 5000
- Frontend runs on port 3000
- The frontend proxies API requests to the backend
- Hot reload is enabled for both frontend and backend (with nodemon)

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check the connection string in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001` before running `npm start`

### CORS Errors
- The backend already includes CORS middleware
- Make sure both servers are running

## Future Enhancements

- User authentication
- Post editing functionality
- Image uploads
- Comments system
- Search and filter
- Pagination
- Rich text editor

## License

MIT

