import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
	try {
		const { name, email, password1, password2 } = req.body;
		if (name && email && password1 && password2) {
			const tempUser = await User.findOne({ email });
			if (tempUser) {
				res.json({
					message:
						"An account with that email address already exists",
				});
			} else {
				if (password1 === password2) {
					const hashedPassword = bcrypt.hashSync(password1, 10);
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
				} else {
					res.json({ message: "Both passwords must match" });
				}
			}
		} else {
			res.json({ message: "Please enter all fields" });
		}
	} catch (error) {
		res.sendStatus(500);
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (email && password) {
			const user = await User.findOne({ email });
			if (user) {
				const isValid = bcrypt.compareSync(password, user.password);
				if (isValid) {
					res.status(200).json({
						id: user.id,
						name: user.name,
						email: user.email,
					});
				} else {
					res.json({ message: "Incorrect password" });
				}
			} else {
				res.json({ message: "No such user found." });
			}
		} else {
			res.json({ message: "Please enter credentials" });
		}
	} catch (error) {
		res.sendStatus(500);
	}
};