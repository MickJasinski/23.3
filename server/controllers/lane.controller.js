import Lane from "../models/lane";
import uuid from "uuid";

export function getSomething(req, res) {
	return res.status(200).end();
}

// *** Get all lanes ***

export function getLanes(req, res) {
	Lane.find().exec((err, lanes) => {
		if (err) {
			res.status(500).send(err);
      return;
		}
		res.json({ lanes });
	});
}

// *** Add new lane ***

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
    return;
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(saved);
  });
}

// *** Update lane ***

export function updateLane(req, res) {
  const { id, name } = req.body;

  if (!laneId || !newName) {
    res.status(403).end();
    return;
  }

  Lane.findOne({ id: laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.name = newName;
    lane.save();
    res.json(lane).end();
  });
}

// *** Delete lane ***

export function deleteLane(req, res) {
  Note.deleteMany({ laneId: req.params.laneId }, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
  });

  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    lane.remove(() => {
      res.status(200).end();
      return;
    });
  });
}
