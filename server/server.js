import { createApp } from './app.js';
import { UserModel } from './models/postgresql/user.js';

const app = createApp({ userModel: UserModel });
const PORT = process.env.PORT || 3001;

export const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
