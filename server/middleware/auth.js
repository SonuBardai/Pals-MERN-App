import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET, async (err, id) => {
        if (err) {
            return res.sendStatus(403);
        }
        const user = await User.findById(id.id);
        req.user = user;
        next();
    });
};
