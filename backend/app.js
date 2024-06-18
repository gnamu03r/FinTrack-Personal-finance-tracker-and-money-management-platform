const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Serve a static HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Database connection
db();

// Export the app for Vercel's serverless function
module.exports = app;
