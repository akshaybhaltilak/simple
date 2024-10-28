const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, welcome to my Node.js server!');
});
app.get('/home', (req, res) => {
    res.send('Hello, This is home page!');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
