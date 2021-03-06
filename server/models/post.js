import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: String,
        tags: { type: [String], default: [] },
        image: { type: String, default: "" },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: [
                {
                    comment: String,
                    commentor: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                    commentDate: { type: Date, default: new Date() },
                },
            ],
            default: [],
        },
        postDate: {
            type: Date,
            default: new Date(),
        },
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
