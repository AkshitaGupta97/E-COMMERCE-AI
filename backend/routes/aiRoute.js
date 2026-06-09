import express from "express";
import { chatWithAi } from "../AiServices/aiController.js";
import { authUser } from "../middleware/authUser.js";

const aiRouter = express.Router();

aiRouter.post('/chat-ai', authUser, chatWithAi);

export default aiRouter;
