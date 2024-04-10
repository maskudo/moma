import {
  createArtwork,
  deleteArtworkById,
  getArtworks,
} from './../controller/artworksController';
import { Router } from 'express';

const router = Router();

router.post('/', createArtwork);
router.get('/', getArtworks);
router.delete('/:id', deleteArtworkById);

export default router;
