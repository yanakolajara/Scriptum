import express from 'express';
import logger from 'morgan';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { getGeminiResponse } from './services/geminiService.js';

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

  socket.on('chat_message', async (message) => {
    console.log(`Received message: ${message}`);
    try {
      const stream = await getGeminiResponse(message);

      for await (const chunk of stream) {
        const text = chunk.text();
        console.log(`Sending chunk: ${text}`);
        socket.emit('chat_response', text);
      }

      socket.emit('chat_done');
    } catch (error) {
      console.error('Error:', error);
      socket.emit('chat_error', 'Streaming error');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
