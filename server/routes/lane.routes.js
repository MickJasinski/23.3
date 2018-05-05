import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Add new Lane
router.route('/lanes').post(LaneController.addLane);

// Update lane
router.route('/lanes/:laneId').put(LaneController.updateLane);

// Get all Lanes
router.route('/lanes').get(LaneController.getLanes);

// Delete a lane by laneId
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

export default router;
