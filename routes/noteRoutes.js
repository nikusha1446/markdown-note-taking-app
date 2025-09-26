import express from 'express';
import upload from '../middleware/upload.js';
import {
  getNote,
  listNotes,
  uploadNote,
} from '../controllers/noteController.js';

const router = express.Router();

router.post('/', upload.single('file'), uploadNote);
router.get('/', listNotes);
router.get('/:file', getNote);

export default router;
