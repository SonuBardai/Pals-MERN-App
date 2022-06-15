import { Router } from "express";
import {
    getPosts,
    getPost,
    newPost,
    updatePost,
    deletePost,
    commentOnPost,
    likePost,
    dislikePost,
} from "../controllers/posts.js";

import { validateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", validateToken, newPost);
router.post("/comment", validateToken, commentOnPost);
router.post("/:id/like", validateToken, likePost);
router.post("/:id/dislike", validateToken, dislikePost);
router.put("/:id", validateToken, updatePost);
router.delete("/:id", validateToken, deletePost);

export default router;
