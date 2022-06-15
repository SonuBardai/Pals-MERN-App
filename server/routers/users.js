import { Router } from "express";
import {
    getUser,
    updateUserProfile,
} from "../controllers/users.js";
import { validateToken } from "../middleware/auth.js";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", validateToken, updateUserProfile);

export default router;
