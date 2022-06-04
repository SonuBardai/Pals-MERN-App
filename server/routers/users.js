import { Router } from "express";
import { getAllUsers } from "../controllers/users.js";

const router = Router();

router.get("/getUsers", getAllUsers);

export default router;
