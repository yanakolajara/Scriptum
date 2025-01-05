import express from 'express';
import logger from 'morgan';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

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

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on('message', (message) => {
    console.log(`Server.consolelog.message-received: ${message}`);
    io.emit('message_response', 'I RECEIVED YOUR MESSAGE:' + message);
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
