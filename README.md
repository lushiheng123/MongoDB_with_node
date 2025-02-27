<h1 align="center">mongoose连接数据库</h1>

```sh

git init
git checkout -b basic
git remote add origin git@github.com:lushiheng123/MongoDB_with_node.git
git push -u origin basic
```

```sh
git init
git remote add origin git@github.com:lushiheng123/MongoDB_with_node.git
git fetch origin
git branch -r
git pull origin basic
```

# 1. 初始化前后端

### 前端

```sh
npm create vite@ latest ./

```

### 后端

```sh
npm init
npm install express nodemon dotenv
```

### 修改后端 package.json

```json
"type":"module"
"server":"nodemon index.js"
```

```sh
MONGO_URI= mongodb+srv://lushiheng:qweasd521666@database.laxjt.mongodb.net/?retryWrites=true&w=majority&
BACKEND_PORT = 5051
```

### 初始化的`index.js`

```js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT || 5051;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("你好");
});
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
```

### 效果：检查后端正常

![alt text](README_Images/README/image.png)
![alt text](README_Images/README/image-1.png)

# 2. (可选)添加 next 中间组件，显示访问的路由

```js
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
```

### 当`GET`访问`www.localhost:5051`时候

![alt text](README_Images/README/image-2.png)

# 3. 一次性添加好路由

### `routes/workouts.js`

```js
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
```

### `index.js`

```js
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
```

### 效果`postman`

![alt text](README_Images/README/image-3.png)

# 4. 在 MongoDB 上添加白名单`0.0.0.0`

![alt text](README_Images/README/image-4.png)

### 后端安装`mongoose`库

```sh
npm i mongoose
```

### 测试连接`index.js`

```js
import express from "express";
import dotenv from "dotenv";
import workoutsRoutes from "./routes/workouts.js";
dotenv.config();
import mongoose from "mongoose";
const app = express();
const PORT = process.env.BACKEND_PORT || 5051;
app.use(express.json());

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
app.get("/", (req, res) => {
  res.send("你好");
});
// app.listen(PORT, () => {
//   console.log(`port is running on ${PORT}`);
// });
```

### 正常 running 代表成功连接了

![alt text](README_Images/README/image-5.png)

# 5. 创建`models/workoutModel.js`模型

```js
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    reps: {
      type: Number,
      require: true,
    },
    load: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
```

### 修改`routes/workouts.js`里面的`post`

```js
import express from "express";
import Workout from "../models/workoutModel.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.get("/:id", (req, res) => {
  res.json({ message: "Hello World with any id" });
});
router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", (req, res) => {
  res.json({ message: "delete a workout " });
});
router.patch("/:id", (req, res) => {
  res.json({ message: "update a workout" });
});
export default router;
```

### 效果：用 `post` 传输数据,进入到了`test`中

```json
{
  "title": "nihao",
  "reps": 50,
  "load": 0
}
```

![alt text](README_Images/README/image-7.png)
![alt text](README_Images/README/image-8.png)

# 6.创建`backend/controllers`迁移到`controller`

### `routes/workouts.js`

```js
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
```

### `models/workoutModel.js`

```js
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    reps: {
      type: Number,
      require: true,
    },
    load: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const Workout = mongoose.model("Workout", workoutSchema);
export { Workout };
```

### `controllers/workoutController.js`

```js
import { Workout } from "../models/workoutModel.js";
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export { createWorkout };
```

### 可以测试一下

# 7.(可选)将数据库的内容放到空路由上`index.js`

```js
app.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find(); // 查询所有 workouts 数据
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```
