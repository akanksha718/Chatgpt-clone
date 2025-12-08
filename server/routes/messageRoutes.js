import express from "express";

const messageRouter = express.Router();
import { imageMessageController, textMessageController } from "../controllers/messageController.js";
import { protect } from "../middlewares/auth.js";


messageRouter.post('/text', protect, textMessageController);
messageRouter.post('/image', protect, imageMessageController);

export default messageRouter;