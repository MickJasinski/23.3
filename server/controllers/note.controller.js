import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

// *** Add new note ***

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
    return;
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

// *** Get all notes ***

export function getNotes(req, res) {
  Note.find().exec((err, notes) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ notes }).end();
  });
}

// *** Update note ***

export function updateNote(req, res) {
  const { id, task } = req.body;

  if (!noteId || !newTask) {
    res.status(400).end();
    return;
  }

  Note.findOne({ id: noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    note.task = newTask;
    note.save();
    res.json(note).end();
  });
}

// *** Delete note ***

export function deleteNote(req, res) {
  const noteId = req.params.noteId;
  const laneId = req.params.laneId;

  if (!noteId || !laneId) {
    res.status(400).end();
    return;
  }

  Note.findOne({ id: noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    note.remove(() => {
      Lane.findOne({ id: laneId }).exec((errLine, lane) => {
        if (errLine) {
          res.status(500).send(errLine);
          return;
        }
        const filtredNotes = lane.notes.filter(currentNote => currentNote.id !== noteId);
        lane.notes = filtredNotes;
        lane.save();
        res.json(note).end();
      });
    });
  });
}

