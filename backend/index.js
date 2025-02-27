import express from "express";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workouts.js";
dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT || 5051;
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/workouts", workoutsRoutes);
app.get("/", (req, res) => {
  res.send("你好");
});
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
