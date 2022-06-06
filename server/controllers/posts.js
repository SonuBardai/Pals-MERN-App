import { Post } from "../models/post.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
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
        const { content, image, replyTo } = req.body;
        await Post.create({ content, image, user: req.user.id, replyTo });
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
        const { content, image } = req.body;
        post.content = content;
        post.image = image;
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
