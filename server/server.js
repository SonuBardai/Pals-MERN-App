import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import mongoose from "mongoose";
import cors from "cors";

import UserRouter from "./routers/users.js";
import AuthRouter from "./routers/auth.js";

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/users", UserRouter);

mongoose.connect(process.env.DB_URL);

app.listen(process.env.PORT, () =>
    console.log("Server Running on PORT: ", process.env.PORT)
);
