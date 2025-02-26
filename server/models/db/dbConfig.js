import pgPromise from 'pg-promise';
import { config } from '../../config/config.js';

const pgp = pgPromise({});

const cn = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
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
