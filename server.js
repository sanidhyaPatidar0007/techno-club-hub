
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Routes
const eventRoutes = require('./routes/eventRoutes');
const clubRoutes = require('./routes/clubRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techno-clubs')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Techno Clubs API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
