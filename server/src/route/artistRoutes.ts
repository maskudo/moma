import {
  createArtist,
  deleteArtistById,
  getArtists,
} from './../controller/artistController';
import { Router } from 'express';

const router = Router();

router.post('/', createArtist);
router.get('/', getArtists);
router.delete('/:id', deleteArtistById);

export default router;
