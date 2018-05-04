import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add new note
router.route('/notes').post(NoteController.addNote);

// Get all notes
router.route('/notes').get(NoteController.getNotes);

// Edit note
router.route('/notes').put(NoteController.editNote);

// Delete note
router.route('/notes/:laneId/:noteId').delete(NoteController.deleteNote);

export default router;
