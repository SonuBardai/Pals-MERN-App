import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import mongoose from "mongoose";
import cors from "cors";

import UserRouter from "./routers/users.js";
import AuthRouter from "./routers/auth.js";
import PostRouter from "./routers/posts.js";

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/posts", PostRouter);

mongoose.connect(process.env.DB_URL);

app.listen(process.env.PORT, () =>
    console.log("Server Running on PORT: ", process.env.PORT)
);
