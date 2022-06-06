import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateAccessToken, generateRefreshToken } from "./utils.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const tempUser = await User.findOne({ email });
        if (tempUser) {
            res.status(400).json({
                message: "An account with that email address already exists",
            });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                const refreshToken = generateRefreshToken(user.id);
                user.refreshToken = refreshToken;
                await user.save();
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    accessToken: generateAccessToken(user.id),
                    refreshToken: generateRefreshToken(user.id),
                });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(401).json({ message: "No such user found." });
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const logoutUser = async (req, res) => {
    if (!req.body.token) return res.sendStatus(401);

    try {
        const user = await User.findOne({ refreshToken: req.body.token });
        if (user) {
            user.refreshToken = "";
            await user.save();
            return res.sendStatus(204);
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const getAccessToken = async (req, res) => {
    const token = req.body.token;

    if (!token) return res.sendStatus(401);
    const user = await User.find({ refreshToken: token });
    if (!user) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_REFRESHTOKEN_SECRET, (err, id) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(id.id);
        res.json({ accessToken });
    });
};
