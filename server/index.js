import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { PORT, CLIENT_URL } from './config/env.js';
import { createChatEvent, genaiMessageEvent } from './sockets/chat.sockets.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('chat:create', (userID) => createChatEvent(socket, userID));
  socket.on('genai:request', (data) => genaiMessageEvent(socket, data));
  socket.on('disconnect', () => console.log('WS Disconnected:', socket.id));
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
