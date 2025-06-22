import dotenv from 'dotenv';
dotenv.config();

import { createServer } from 'http';
import { initializeChatSockets } from './socket.js';

const httpServer = createServer();
initializeChatSockets(httpServer);

const PORT = process.env.PORT || 4010;

httpServer.listen(PORT, () =>
  console.log(`✅ Chat service running on port ${PORT}`)
);
