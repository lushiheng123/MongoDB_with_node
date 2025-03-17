import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRouter);
//最简单的方式
mongoose.connect(process.env.MONGO_URI);
//稍微麻烦点的方式
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`port is running on ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
app.get("/", (req, res) => {
    res.send("你好")
})
app.listen(process.env.BACKEND_PORT, () => {
  console.log("server started");
});