import express from 'express';
import https from 'https';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import {
  createClipping,
  readClipping,
  updateClipping,
  deleteClipping,
  listClipping,
} from './controllers/clippingController.js';
import { socketAuth } from './middleware/authMiddleware.js';

config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, '/.cert/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '/.cert/server.key')),
  },
  app,
);

const io = new Server(server, {
  cors: {
    origin: 'https://localhost:3000',
  },
});

io.use(socketAuth);

io.on('connection', (socket) => {
  const connectionsPool = io.of('/').sockets;
  const userId = socket.user._id;
  let userConnections = [];

  for (let [id, socket] of connectionsPool) {
    if (socket.user._id.equals(userId)) {
      userConnections.push(id);
    }
  }

  socket.emit('user:connected', userConnections);
  console.log('pool:', connectionsPool.size);
  console.log(`Socket ${socket.id} from user ${userId} connected`);

  socket.on('disconnect', () => {
    console.log(`Socket:${socket.id} disconnected`);
    userConnections = userConnections.filter(
      (connection) => connection !== socket.id,
    );
  });

  socket.on('User_Connect', (userId) =>
    console.log(`User connection: ${userId}`),
  );

  socket.on('clipping:create', createClipping);
  socket.on('clipping:read', readClipping);
  socket.on('clipping:update', updateClipping);
  socket.on('clipping:delete', deleteClipping);
  socket.on('clipping:list', listClipping);
});

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

server.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}.`.yellow.bold),
);
