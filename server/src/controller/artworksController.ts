import { Request, Response } from 'express';
import { pool } from '../config/db';
import { Artists } from '../interface/Artists';
import { Artwork } from '../interface/Artworks';

export const getArtworks = async (req: Request, res: Response) => {
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
      //regexes dont get cached so there should be a better way to do this.
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
};

export const createArtwork = async (req: Request, res: Response) => {
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
};

export const deleteArtworkById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query<Artwork>(
    `DELETE FROM artworks where id = $1`,
    [id]
  );
  res.status(200).json({ id });
};
