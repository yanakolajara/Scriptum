// import { createApp } from './app.js';
// import { createServer } from 'node:http';
// import { userModel } from './models/user.model.js';
// import { entryModel } from './models/entry.model.js';
// import { userContextModel } from './models/userContext.model.js';
// import { initializeChatSockets } from './services/chat-service/sockets.service.js';
// import { corsMiddleware } from './shared/middlewares/cors.middleware.js';

// const app = createApp({ userModel, entryModel, userContextModel });
// const PORT = process.env.PORT || 8080;

// export const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🌐 API Gateway listening on port ${PORT}`);
});
