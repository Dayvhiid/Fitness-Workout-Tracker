import express from 'express';
import { createWorkout, getWorkouts, updateWorkout, getReport } from '../controllers/workoutController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, createWorkout);
router.get('/', auth, getWorkouts);
router.put('/:id', auth, updateWorkout);
router.get('/report', auth, getReport);

export default router;
