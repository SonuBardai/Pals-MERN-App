import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
const app = express();

import UserRouter from "./routers/users.js";
import AuthRouter from "./routers/auth.js";

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/users", UserRouter);

mongoose.connect(process.env.DB_URL);

app.listen(process.env.PORT, () =>
	console.log("Server Running on PORT: ", process.env.PORT)
);
