import express from "express";

import {
  createWorkout,
  getWorkout,
  getWorkouts,
} from "../controllers/workoutController.js";
const router = express.Router();
//获取全部workouts
router.get("/", getWorkouts);
//获取具体一个workout
router.get("/:id", getWorkout);
//post添加workout
router.post("/", createWorkout);
//delete删除workout
router.delete("/:id", (req, res) => {
  res.json({ message: "delete a workout " });
});
//update更新workout
router.patch("/:id", (req, res) => {
  res.json({ message: "update a workout" });
});
export default router;
