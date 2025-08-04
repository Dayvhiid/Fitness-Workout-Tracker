import Workout from '../models/Workout.js';

// Create workout
export const createWorkout = async (req, res) => {
  try {
    const workout = new Workout({ ...req.body, user: req.user });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get workouts sorted by date
export  const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user }).sort({ date: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getReport = async (req, res) => {
  try {
    const { start, end } = req.query;
    const workouts = await Workout.find({
      user: req.user,
      date: { $gte: new Date(start), $lte: new Date(end) }
    });

    const total = workouts.length;
    const finished = workouts.filter(w =>
      w.exercises.every(ex => ex.done)
    ).length;

    const percentage = total ? (finished / total) * 100 : 0;
    res.json({ total, finished, percentage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
