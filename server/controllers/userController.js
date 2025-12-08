import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Chat from "../models/Chat.js";

const genersteToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const newUser = await User.create({ name, email, password });
        const token = genersteToken(newUser._id);
        res.json({ success: true, token, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.json({ success: false, message: "Server error", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = genersteToken(user._id);
        res.json({ success: true, token, message: "Login successful" });
    }
    catch (error) {
        res.json({ success: false, message: "Server error" });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.json({ success: true, user });
    }
    catch (error) {
        return res.json({ success: false, message: "Server error" });
    }
}


export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            { $unwind: "$messages" },
            { $match: { "messages.isImage": true, "messages.isPublished": true } },
            { $project: { _id: 0, imageUrl: "$messages.content", userName: "$userName" } },
        ]);
        return res.json({ success: true, images: publishedImageMessages.reverse() });
    }
    catch (error) {
        return res.json({ success: false, message: "Server error" });
    }
}