import express from 'express';
import logger from 'morgan';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { handleWebSocketEvents } from './controllers/websocketController.js';

const port = process.env.PORT ?? 3001;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(logger('dev'));
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

handleWebSocketEvents(io);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
