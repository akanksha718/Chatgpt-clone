import Chat from "../models/Chat.js";


export const createChat = async (req, res) => {
    // Implementation for creating a new chat
    try{
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [] ,
            name: "New Chat",
            userName: req.user.name
        };
        await Chat.create(chatData);
        res.json({ success: true, message: "Chat created successfully" });
    }catch(error){
        res.json({ success: false, message: "Server error" });
    }
}


export const getChats = async (req, res) => {
    // Implementation for fetching user chats
    try{
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
        res.json({ success: true, chats });
    }catch(error){
        res.json({ success: false, message: "Server error" });
    }   
}

export const deleteChat = async (req, res) => {
    // Implementation for deleting a chat
    try{
        const userId = req.user._id;
        const { chatId } = req.body;
        await Chat.deleteOne({ _id: chatId, userId });
        res.json({ success: true, message: "Chat deleted successfully" });
    }catch(error){
        res.json({ success: false, message: "Server error" });
    }
}