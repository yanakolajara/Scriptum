import dotenv from 'dotenv';

dotenv.config();

import { createApp } from './app.js';
import { UserModel } from './models/user.model.js';

const PORT = process.env.PORT || 4010;
const app = createApp({ UserModel });

app.listen(PORT, () => {
  console.log(`✅ Users service running on port ${PORT}`);
});
