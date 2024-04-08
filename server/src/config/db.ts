import { Pool } from 'pg';

// PostgreSQL connection configuration
const pgConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test1234',
  port: 5432,
};

const pool = new Pool(pgConfig);
export { pool }
