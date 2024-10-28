// Import necessary modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Enable CORS for the frontend
app.use(cors({
  origin: 'https://sanchat.vercel.app', // Replace with your frontend URL in production
  methods: ['GET', 'POST']
}));

// Create an HTTP server and initialize Socket.IO with CORS configuration
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://sanchat.vercel.app', // Adjust for production use
    methods: ['GET', 'POST']
  }
});

// Define a simple test endpoint
app.get('/', (req, res) => {
  res.send('Socket.IO server is running!');
});

// Additional API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is healthy and running!' });
});

// Setup Socket.IO for real-time communication
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for messages from the client and broadcast to all clients
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.emit('receive_message', data);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
