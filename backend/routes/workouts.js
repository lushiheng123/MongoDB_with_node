import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.get("/:id", (req, res) => {
  res.json({ message: "Hello World with any id" });
});
router.post("/", (req, res) => {
  res.json({ message: "Hello World with POST" });
});
router.delete("/:id", (req, res) => {
  res.json({ message: "delete a workout " });
});
router.patch("/:id", (req, res) => {
  res.json({ message: "update a workout" });
});
export default router;
