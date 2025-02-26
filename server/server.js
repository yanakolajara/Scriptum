import { createApp } from './app.js';
import { createServer } from 'node:http';
import { userModel } from './models/user.model.js';
import { entryModel } from './models/entry.model.js';
import { initializeChatSockets } from './services/sockets.service.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';

const app = createApp({ userModel, entryModel });
const httpServer = createServer(app);
const PORT = process.env.PORT || 8080;

const io = initializeChatSockets(httpServer, corsMiddleware);

export const server = httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
