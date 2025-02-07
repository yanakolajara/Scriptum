import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
// import { createChatEvent, genaiMessageEvent } from './sockets/chat.sockets.js';
// import { corsMiddleware } from './middlewares/cors.js';
import { UserModel } from './models/user.js';
import { createUsersRouter } from './routes/users.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(morgan('dev'));
app.use(express.json());
// app.use(corsMiddleware());

app.use('/users', createUsersRouter({ userModel: UserModel }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// io.on('connection', (socket) => {
//   socket.on('chat:create', (userID) => createChatEvent(socket, userID));
//   socket.on('genai:request', (data) => genaiMessageEvent(socket, data));
//   socket.on('disconnect', () => console.log('WS Disconnected:', socket.id));
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
