import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
		description: String,
		profilePic: { type: String, default: "" },
		coverPic: { type: String, default: "" },
		followers: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		following: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
