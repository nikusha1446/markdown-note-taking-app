import express from 'express';
import upload from '../middleware/upload.js';
import {
  checkNoteGrammar,
  getNote,
  listNotes,
  uploadNote,
} from '../controllers/noteController.js';

const router = express.Router();

router.post('/', upload.single('file'), uploadNote);
router.get('/', listNotes);
router.get('/:file', getNote);
router.get('/:file/grammar', checkNoteGrammar);

export default router;
