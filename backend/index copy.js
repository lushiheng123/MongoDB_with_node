import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.BACKEND_PORT || 8081


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


app.get("/", (req, res) => {
  res.send("你好");
});

// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
// })