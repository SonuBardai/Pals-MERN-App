import { User } from "../models/user.js";

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate("posts");
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const parameterId = req.params.id;

    if (userId === parameterId) {
        const user = await User.findById(userId);
        user.description = req.body.description;
        user.profilePic = req.body.image;
        user.coverPic = req.body.cover;

        await user.save();
        return res.send({ message: "Profile Modified" });
    }
    return res
        .status(403)
        .send({ message: "You are not authorized to access this route" });
};

export const followUser = async (req, res) => {
    const { followed, follower, action } = req.body;

    try {
        const followedUser = await User.findById(followed);
        const followerUser = await User.findById(follower);

        if (action === "follow") {
            followedUser.followers.push(follower);
            followerUser.following.push(followed);
        } else {
            const newFollowers = followedUser.followers.filter(
                (user) => user._id === follower
            );
            followedUser.followers = newFollowers;

            const newFollowing = followerUser.following.filter(
                (user) => user._id === followed
            );
            followerUser.following = newFollowing;
        }

        console.log(
            followerUser.name,
            followerUser.following,
            `\n has ${action}ed the user \n`,
            followedUser.name,
            followedUser.followers
        );

        await followedUser.save();
        await followerUser.save();

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
