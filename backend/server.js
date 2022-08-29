import express from 'express';
import https from 'https';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import useragent from 'express-useragent';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import {
  createClipping,
  createImageClipping,
  createFileClipping,
  readClipping,
  updateClipping,
  deleteClipping,
  listClipping,
} from './controllers/clippingController.js';
import { socketAuth, protect } from './middleware/authMiddleware.js';
import { download } from './middleware/downloadMiddleware.js';

config();
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());

app.use(
  '/download/',
  protect,
  download,
  express.static(path.join(__dirname, 'tmp/download')),
);

app.use(
  '/thumbnail/',
  protect,
  express.static(path.join(__dirname, 'tmp/thumbnail')),
);

app.use('/api/users', userRoutes);
app.use(morgan('dev'));

let server, io;
if (process.env.NODE_ENV === 'development') {
  // add development middleware to express
  app.use(cors());
  app.get('/', (req, res) => {
    res.send('API running in development mode');
  });

  server = https.createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, '/.cert/server.crt')),
      key: fs.readFileSync(path.join(__dirname, '/.cert/server.key')),
    },
    app,
  );

  io = new Server(server, {
    cors: {
      origin: 'https://localhost:3000',
    },
    maxHttpBufferSize: 1e8, // 100MB
  });
} else if (process.env.NODE_ENV === 'production') {
  // serve react frontend
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('/**', (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend/build/index.html')),
  );

  server = http.createServer(app);
  io = new Server(server, { maxHttpBufferSize: 1e8 });
}

app.use(notFound);
app.use(errorHandler);

io.use(socketAuth);

io.on('connection', (socket) => {
  const connectionsPool = io.of('/').sockets;
  const userId = socket.user._id;

  // join a room under '<userId>'
  socket.join(userId.toString());

  let userConnections = [];

  for (let [id, socket] of connectionsPool) {
    if (socket.user._id.equals(userId)) {
      userConnections.push(id);
    }
  }

  socket.emit('user:connected', userConnections);
  console.log('pool:', connectionsPool.size);
  console.log(
    `Socket ${socket.id} from user ${userId} connected`.green.underline,
  );

  socket.on('disconnect', (reason) => {
    console.log(
      `Socket:${socket.id} disconnected for reason:${reason}`.blue.underline,
    );
    userConnections = userConnections.filter(
      (connection) => connection !== socket.id,
    );
  });

  socket.on('User_Connect', (userId) =>
    console.log(`User connection: ${userId}`),
  );

  socket.on('clipping:create', createClipping);
  socket.on('clipping:create_image', createImageClipping);
  socket.on('clipping:create_file', createFileClipping);
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
