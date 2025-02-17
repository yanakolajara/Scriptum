import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();
const pgp = pgPromise({});

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

const db = pgp(cn);
db.connect()
  .then((obj) => {
    console.log('Database connected');
    obj.done();
  })
  .catch((e) => {
    console.log('Database connection error:', e.message || e);
  });

export default db;
