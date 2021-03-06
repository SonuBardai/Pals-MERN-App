import { Post } from "../models/post.js";
import { User } from "../models/user.js";

export const getPosts = async (req, res) => {
    try {
        let posts = await Post.find({})
            .sort("-createdAt")
            .populate("user")
            .populate("comments.commentor");
        return res.status(200).json(posts);
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate("user");
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const newPost = async (req, res) => {
    try {
        const { content, image, tags } = req.body;
        const createdPost = await Post.create({
            content,
            image,
            user: req.user.id,
            tags,
        });
        const post = await Post.findById(createdPost.id).populate("user");
        res.status(201).send(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const { user, comment, postId } = req.body;
        const post = await Post.findById(postId);
        post.comments.push({ comment, commentor: user });
        await post.save();
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        const { content, image, tags } = req.body;
        post.content = content;
        post.image = image;
        post.tags = tags;
        await post.save();
        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        post.remove();
        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.userId;

        const action = req.body.action;

        const user = await User.findById(userId);
        const post = await Post.findById(postId);
        if (action === "like") {
            user.likedPosts.push(postId);
            post.likes++;
        } else {
            const newLikedPosts = user.likedPosts.filter(
                (post) => post._id !== postId
            );
            user.likedPosts = newLikedPosts;
            if (post.likes > 0) {
                post.likes--;
            } else {
                post.likes = 0;
            }
        }
        await user.save();
        await post.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const getPopularPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort("-likes")
            .populate("user")
            .populate("comments.commentor");
        return res.json(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
