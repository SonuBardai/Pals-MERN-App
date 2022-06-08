import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: { type: String, select: false },
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
        posts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Post",
            default: [],
        },
        likedPosts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Post",
            default: [],
        },
        refreshToken: { type: String, default: "" },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
