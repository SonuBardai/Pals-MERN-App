import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET, async (err, id) => {
        if (err) {
            console.log("Error in token verification: ", err);
            return res.status(403).json({ message: "Access Token Expired" });
        }
        const user = await User.findById(id.id);
        req.user = user;
        next();
    });
};
