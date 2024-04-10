import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './src/config/db';
import { Artists } from './src/interface/Artists';
import { Artwork } from '@/interface/Artworks';

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
    res.status(500).json({ message: e.message });
  }
});

app.get('/artists', async (req: Request, res: Response) => {
  try {
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
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

app.get('/artworks', async (req: Request, res: Response) => {
  const { artwork, artist } = req.query;
  let data;
  if (artwork?.length || artist?.length) {
    if (!artist?.length) {
      data = await pool.query<Artists>(
        `SELECT *, artworks.id from artworks 
      JOIN 
        artwork_artist ON artworks.id = artwork_artist.artwork_id
      JOIN 
        artists ON artwork_artist.artist_id = artists."ConstituentID"
      where "Title" like $1 limit 10;`,
        [`%${artwork}%`]
      );
    } else {
      data = await pool.query<Artists>(
        `SELECT *, artworks.id from artworks 
      JOIN 
        artwork_artist ON artworks.id = artwork_artist.artwork_id
      JOIN 
        artists ON artwork_artist.artist_id = artists."ConstituentID"
      where "Title" like $1 ` +
          (artist?.length ? ' AND artwork_artist.artist_id = $2' : '') +
          ' limit 10;',
        [`%${artwork}%`, artist]
      );
    }
  } else {
    data = await pool.query<Artwork>(`
    SELECT *,artworks.id from artworks 
    JOIN 
        artwork_artist ON artworks.id = artwork_artist.artwork_id
    JOIN 
        artists ON artwork_artist.artist_id = artists."ConstituentID"
    limit 10;
    `);
  }
  res.json(data.rows);
});

app.post('/artworks', async (req: Request, res: Response) => {
  const { Artist, Title, Date, Nationality, URL, ImageURL } = req.body;
  const { rows } = await pool.query<Artwork>(
    `INSERT INTO artworks("Title", "Date", "Nationality", "URL", "ImageURL") VALUES($1, $2, $3, $4, $5) returning *;`,
    [Title, Date, Nationality, URL, ImageURL]
  );
  const id = rows[0].id;
  await pool.query(
    `INSERT INTO artwork_artist(artist_id, artwork_id) VALUES($1, $2)`,
    [Artist, id]
  );
  res.json({ artwork: rows[0] });
});

app.delete('/artworks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log({ id });
  const { rows } = await pool.query<Artwork>(
    `DELETE FROM artworks where id = $1`,
    [id]
  );
  console.log([rows]);
  res.status(200).json({ id });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
