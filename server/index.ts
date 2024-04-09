import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './src/config/db';
import { Artists } from './src/interface/Artists';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors<Request>());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/artists', async (req: Request, res: Response) => {
  try {
    const { DisplayName, ArtistBio, Nationality, Gender, BeginDate, EndDate } =
      req.body;
    const { rows } = await pool.query(
      `INSERT INTO artists("DisplayName", "ArtistBio", "Nationality", "Gender", "BeginDate", "EndDate") VALUES($1, $2, $3, $4, $5, $6) returning *;`,
      [DisplayName, ArtistBio, Nationality, Gender, BeginDate, EndDate]
    );
    res.json(rows[0]);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

app.get('/artists', async (req: Request, res: Response) => {
  const { artist } = req.query;
  let data;
  if (artist?.length) {
    data = await pool.query<Artists>(
      `SELECT * from artists where "DisplayName" like $1 limit 10;`,
      [`%${artist}%`]
    );
  } else {
    data = await pool.query<Artists>('SELECT * from artists limit 10;');
  }
  res.json(data.rows);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
