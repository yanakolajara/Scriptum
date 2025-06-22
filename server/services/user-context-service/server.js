import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`✅ Entry service running on port ${PORT}`);
});
