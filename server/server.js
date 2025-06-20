import { createApp } from './app.js';
import { createServer } from 'node:http';
import { userModel } from './models/user.model.js';
import { entryModel } from './models/entry.model.js';
import { userContextModel } from './models/userContext.model.js';
import { initializeChatSockets } from './sockets.service.js';
import { corsMiddleware } from './shared/middlewares/cors.middleware.js';

const app = createApp({ userModel, entryModel, userContextModel });
const PORT = process.env.PORT || 8080;

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
