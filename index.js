const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');

  // Simulate bus location updates
  setInterval(() => {
    const busLocation = {
      latitude: 28.6139 + Math.random() * 0.01, // Simulating movement
      longitude: 77.2090 + Math.random() * 0.01,
    };
    socket.emit('busLocationUpdate', busLocation);
  }, 3000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
