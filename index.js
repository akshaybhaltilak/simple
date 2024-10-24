const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow cross-origin requests

// Create an HTTP server
const server = http.createServer(app);

// Set up Socket.io with long-polling as the transport
const io = new Server(server, {
  cors: {
    origin: '*',   // Allow all origins
    methods: ['GET', 'POST'],
  },
  transports: ['polling'], // Use long-polling instead of WebSockets
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for 'chatMessage' event and broadcast to all clients
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Export the server for Vercel's Serverless functions
module.exports = (req, res) => {
  server.emit('request', req, res);
};
