import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Add new lane
router.route('/lanes').post(LaneController.addLane);

// Update lane
router.route('/lanes/:laneId').put(LaneController.updateLane);

// Get all lanes
router.route('/lanes').get(LaneController.getLanes);

// Delete a lane
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

export default router;
