import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

config();

connectDB();

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, '/.cert/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '/.cert/server.key')),
  },
  app,
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

server.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}.`.yellow.bold),
);
