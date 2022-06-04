import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).sort("-createdAt");
		res.json(users);
	} catch (error) {
		res.sendStatus(500);
	}
};