import Chat from "../models/chat.js";


export const textMessageController = async (req, res) => {  
    try {
        const userId = req.user._id;
        const {chatId , prompt} = req.body;
        const chat = await Chat.findOne({ _id: chatId, userId });
        if (!chat) {
            return res.json({ success: false, message: "Chat not found" });
        }
        chat.messages.push({ role: "user", content: prompt,timestamp: Date.now(), isImage: false });
        
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }   
}