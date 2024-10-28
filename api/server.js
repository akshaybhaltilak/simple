const express = require('express');
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, welcome to my Node.js server!');
});

app.get('/home', (req, res) => {
  res.send('Hello, This is the home page!');
});

module.exports = app; // Export the app for Vercel
