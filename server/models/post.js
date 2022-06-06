import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: String,
        image: { type: String, default: "" },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        likedBy: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        replies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Post",
            default: [],
        },
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: null,
        },
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
