import { createApp } from './app.js';
import { UserModel } from './models/postgresql/user.js';

const app = createApp({ userModel: UserModel });
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 0;

export const server = app.listen(PORT, () => {
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);
});
