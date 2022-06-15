import { User } from "../models/user.js";

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
