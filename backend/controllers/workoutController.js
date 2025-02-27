import { Workout } from "../models/workoutModel.js";

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ create: -1 });
  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "workout not found" });
  }
  res.status(200).json(workout);
};
//delete a workout

//update a workout
//create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export { createWorkout,getWorkout,getWorkouts };
