import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add new note
router.route('/notes').post(NoteController.addNote);

// Get all notes
router.route('/notes').get(NoteController.getNotes);

// Update note
router.route('/notes').put(NoteController.updateNote);

// Delete note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;
