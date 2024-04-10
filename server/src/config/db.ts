import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection configuration
const pgConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.host,
  database: process.env.DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
};

const pool = new Pool(pgConfig);
export { pool };
