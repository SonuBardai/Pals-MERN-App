import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getAccessToken,
} from "../controllers/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", getAccessToken);

export default router;
