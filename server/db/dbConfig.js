import pgPromise from 'pg-promise';
import {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD,
} from '../config/env.js';

const pgp = pgPromise();

const cn = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
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
