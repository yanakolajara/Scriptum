import dotenv from 'dotenv';

dotenv.config();

import { createApp } from './app.js';
import { ContextModel } from './models/context.model.js';
import { GeminiService } from './services/gemini/gemini.service.js';

const PORT = process.env.PORT || 4001;
const app = createApp({ ContextModel, GeminiService });

app.listen(PORT, () => {
  console.log(`✅ Entry service running on port ${PORT}`);
});
