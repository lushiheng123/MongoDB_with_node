import express from "express";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workouts.js";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import { Workout } from "./models/workoutModel.js"; // 导入 Workout 模型

const app = express();
const PORT = process.env.BACKEND_PORT || 5051;
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// 测试连接
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`port is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/workouts", workoutsRoutes);
// 新增路由获取 MongoDB 中的数据
app.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find(); // 查询所有 workouts 数据
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// app.listen(PORT, () => {
//   console.log(`port is running on ${PORT}`);
// });
