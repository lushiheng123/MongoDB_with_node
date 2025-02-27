import express from "express";

import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workoutController.js";
const router = express.Router();
//获取全部workouts
router.get("/", getWorkouts);
//获取具体一个workout
router.get("/:id", getWorkout);
//post添加workout
router.post("/", createWorkout);
//delete删除workout
router.delete("/:id", deleteWorkout);

//update更新workout
router.patch("/:id", updateWorkout);

export default router;
