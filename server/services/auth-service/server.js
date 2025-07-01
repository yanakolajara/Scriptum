import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});
