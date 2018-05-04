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
		}
		res.json({ lanes });
	});
}

// *** Add new lane ***

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

// *** Edit lane ***

export function editLane(req, res) {
  const { id: laneId, name: newName } = req.body;

  if (!laneId || !newName) {
    res.status(403).end();
  }

  Lane.findOne({ id: laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.name = newName;
    lane.save();
    res.json(lane).status(200).end();
  });
}

// *** Delete lane ***

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}
