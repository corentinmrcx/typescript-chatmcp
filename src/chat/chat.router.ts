import { chatController } from './chat.controller';
import express from 'express';

export const chatRouter = express.Router();

chatRouter.get('/', chatController.chat);
