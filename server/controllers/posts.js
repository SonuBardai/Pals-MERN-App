import { Post } from "../models/post.js";

export const getPosts = async (req, res) => {
    try {
        let posts = await Post.find({})
            .sort("-updatedAt")
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
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const newPost = async (req, res) => {
    try {
        const { content, image, tags } = req.body;
        const post = await Post.create({
            content,
            image,
            user: req.user.id,
            tags,
        });
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
        post.save();
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
