<h1 align="center">Mongoose和登录上传图片</h1>

```sh
git init
git checkout -b login
git remote add origin git@github.com:lushiheng123/MongoDB_with_node.git
git push -u origin login
```

# 1. 测试连接

```js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.BACKEND_PORT || 8081;

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
```

![alt text](README_Images/README/image.png)

# 2. 安装`jsonwebtoken`和`bcrypt`

### 写数据库模型,backend/models/Users.js

```js
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const UserModel = mongoose.model("users", UserSchema);
```

### /backend/routes/users.js

```js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  res.json(user);
});
router.post("/login");
export { router as userRouter };
```

### index.js 中包含简单的/api/auth 路由，用 localhost:8081/api/auth/register 测试

<details>
<summary>index.js</summary>

```js
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
  res.send("你好");
});
app.listen(process.env.BACKEND_PORT, () => {
  console.log("server started");
});
```

## </details>

---

# 3. 这次是 env 中先写上 database 和 collection 的名字，我们这次用 shujuku2

```env
MONGO_URI = mongodb+srv://lushiheng:lushiheng123@database.laxjt.mongodb.net/shujuku2?retryWrites=true&w=majority&appName=database
BACKEND_PORT = 8081
```

### 先添上初始数据，用 postman 测试

![alt text](README_Images/README/image-1.png)
![alt text](README_Images/README/image-2.png)

# 4. 通过 bcrypt 哈希库处理密码

### 在 routes/users.js

```js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ msg: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ msg: "User Registered Successfully" });
});
router.post("/login");
export { router as userRouter };
```

### 效果，可以做到验证用户是否存在，不存在就创建

![alt text](README_Images/README/image-3.png)

# 5. 完善 login 功能(记得创建新用户)

<details>
<summary>backend/routes/users.js</summary>

```js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ msg: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ msg: "User Registered Successfully" });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is Incorrect" });
  }
  const token = jwt.sign({ id: user_id }, "secret");
  res.json({ token, userId: user._id });
});
export { router as userRouter };
```

</details>

### 效果（显示 token)

![alt text](README_Images/README/image-4.png)
![alt text](README_Images/README/image-5.png)

### 后台数据库：加密了密码

![alt text](README_Images/README/image-6.png)

# 6. 写前端
