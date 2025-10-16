import { chatController } from './chat.controller';
import express from 'express';
import * as z from "zod";
import { validateBody, validateParams } from '../utils/validator';

export const chatRouter = express.Router();

const promptSchema = z.object({
    prompt: z.string().min(1)
});

const idSchema = z.object({
    id: z.string().regex(/^[a-f0-9]{24}$/)
});

chatRouter.get('/', chatController.chat);
chatRouter.post('/send/:id', 
    validateParams(idSchema),
    express.urlencoded(),
    validateBody(promptSchema),
    chatController.sendPrompt
);
