import { Router } from "express";
import {
    getUser,
    updateUserDescription,
} from "../controllers/users.js";
import { validateToken } from "../middleware/auth.js";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", validateToken, updateUserDescription);
router.put("/:id", validateToken, updateUserDescription);

export default router;
