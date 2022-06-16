import { Router } from "express";
import {
    getUser,
    updateUserProfile,
    followUser,
} from "../controllers/users.js";
import { validateToken } from "../middleware/auth.js";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", validateToken, updateUserProfile);
router.put("/users/follow", validateToken, followUser);

export default router;
