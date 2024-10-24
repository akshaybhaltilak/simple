const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from "public" folder

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for incoming messages
  socket.on('chatMessage', (msg) => {
    // Broadcast message to all users
    io.emit('chatMessage', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
