import axios from "axios";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import imagekit from "../config/imagekit.js";
import openai from "../config/openai.js";


export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (req.user.credits < 2) {
            return res.json({ success: false, message: "Not enough credits" });
        }
        const { chatId, prompt } = req.body;
        const chat = await Chat.findOne({ _id: chatId, userId });
        if (!chat) {
            return res.json({ success: false, message: "Chat not found" });
        }
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });
        const { choices } = await openai.chat.completions.create({
            model: process.env.GROQ_API_KEY ? "llama-3.3-70b-versatile" : "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        const reply = { ...choices[0].message, isImage: false, timestamp: Date.now() };
        res.json({ success: true, message: reply });
        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
    } catch (error) {
        console.error("Full error object:", error);
        console.error("Error status:", error.status);
        console.error("Error code:", error.code);
        console.error("Error response:", error.response?.data);
        res.json({ 
            success: false, 
            message: "server error", 
            error: error.message,
            status: error.status,
            code: error.code
        });
    }
}



export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (req.user.credits < 2) {
            return res.json({ success: false, message: "Not enough credits" });
        }
        const { chatId, prompt ,isPublished} = req.body;
        const chat = await Chat.findOne({ _id: chatId, userId });
        if (!chat) {
            return res.json({ success: false, message: "Chat not found" });
        }
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });
        const encodedPrompt = encodeURIComponent(prompt);

        const generatedImageUrl= `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;
        const aiImageResponse = await  axios.get(generatedImageUrl, { responseType: 'arraybuffer' });

        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, 'binary').toString('base64')}`;

        const uploadResponse = await imagekit.files.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt"
        });
        const reply = { role: "assistant", content: uploadResponse.url, isImage: true, timestamp: Date.now(),isPublished };
        res.json({ success: true, message: reply });
        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
    } catch (error) {
        console.error("imageMessageController error:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        res.json({ success: false, message: "Server error", error: error.message });
    }
}


