import { Router } from "express";
import { getAllUsers } from "../controllers/users.js";
import { validateToken } from "../middleware/auth.js";

const router = Router();

router.get("/users", validateToken, getAllUsers);

export default router;
