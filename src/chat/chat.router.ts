import { chatController } from './chat.controller';
import express from 'express';
import * as z from "zod";
import { validateBody } from '../utils/validator';

export const chatRouter = express.Router();

const promptSchema = z.object({
    prompt: z.string().min(1)
});

chatRouter.get('/', chatController.chat);
chatRouter.post('/send/:id', 
    express.urlencoded(),
    validateBody(promptSchema),
    chatController.sendPrompt
);
