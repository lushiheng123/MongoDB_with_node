import express from "express";

import { createWorkout } from "../controllers/workoutController.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.get("/:id", (req, res) => {
  res.json({ message: "Hello World with any id" });
});
router.post("/", createWorkout);
router.delete("/:id", (req, res) => {
  res.json({ message: "delete a workout " });
});
router.patch("/:id", (req, res) => {
  res.json({ message: "update a workout" });
});
export default router;
