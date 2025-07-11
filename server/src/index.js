require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_app'; // Default to local

// Middleware
app.use(cors());
app.use(express.json()); 

// Basic route
app.get('/', (req, res) => {
    res.send('MERN Server is running!');
});

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Database connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Only start the server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; 