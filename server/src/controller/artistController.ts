import { Request, Response } from 'express';
import { Artwork } from '../interface/Artworks';
import { pool } from '../config/db';
import { Artists } from '../interface/Artists';

export const createArtist = async (req: Request, res: Response) => {
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
};

export const getArtists = async (req: Request, res: Response) => {
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
};

export const deleteArtistById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query<Artwork>(`DELETE FROM artists where "ConstituentID" = $1`, [
    id,
  ]);
  res.status(200).json({ id });
};
