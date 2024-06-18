const express = require('express');
const path = require('path');
const { db } = require('./db/db');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve the index.html directly from the backend directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
const routesPath = path.join(__dirname, 'routes');
app.use('/api/v1', require(path.join(routesPath, 'transactions')));

// Database connection (ensure this is correctly configured)
db();

// Export the app for Vercel's serverless function
module.exports = app;
