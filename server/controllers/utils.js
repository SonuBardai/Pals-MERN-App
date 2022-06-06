import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESSTOKEN_SECRET, {
        expiresIn: "20m",
    });
};

export const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESHTOKEN_SECRET);
};