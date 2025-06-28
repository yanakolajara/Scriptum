import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});
