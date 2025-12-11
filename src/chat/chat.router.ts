import { chatController } from './chat.controller';
import express from 'express';
import * as z from "zod";
import { validateBody, validateParams } from '../utils/validator';
import { connectionRequired } from '../user/user.middleware';
import { isChatOwner } from './chat.middleware';

export const chatRouter = express.Router();

const promptSchema = z.object({
    prompt: z.string().min(1)
});

const updateTitleSchema = z.object({
    title: z.string().min(1).max(100)
});

const idSchema = z.object({
    id: z.string().regex(/^[a-f0-9]{24}$/)
});

chatRouter.get('/', connectionRequired, chatController.chat);
chatRouter.get('/new', connectionRequired, chatController.newChat)
chatRouter.get('/:id', connectionRequired, validateParams(idSchema), isChatOwner, chatController.chat)

chatRouter.get('/editTitle/:id', connectionRequired, validateParams(idSchema), isChatOwner, chatController.editTitle);
chatRouter.get('/displayTitle/:id', connectionRequired, validateParams(idSchema), isChatOwner, chatController.displayTitle);

chatRouter.post('/send/:id', 
    connectionRequired,
    validateParams(idSchema),
    isChatOwner,
    express.urlencoded(),
    validateBody(promptSchema),
    chatController.sendPrompt
);

chatRouter.post('/updateTitle/:id',
    connectionRequired,
    validateParams(idSchema),
    isChatOwner,
    express.urlencoded(),
    validateBody(updateTitleSchema),
    chatController.updateTitle
);
