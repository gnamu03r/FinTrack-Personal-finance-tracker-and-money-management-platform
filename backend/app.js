const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const routesPath = path.join(__dirname, 'routes');
readdirSync(routesPath).forEach((file) => {
  const routeFilePath = path.join(routesPath, file);
  if (file.endsWith('.js')) {
    const route = require(routeFilePath);
    app.use('/api/v1', route);
  }
});

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Serve a static HTML page (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Database connection
db();

// Export the app for Vercel's serverless function
module.exports = app;
