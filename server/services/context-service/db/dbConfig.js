import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const pgp = pgPromise({});

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
