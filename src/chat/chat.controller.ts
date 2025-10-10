import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import ChatView from './views/chat';
import { ChatItemView } from './views/chat-item';

class ChatController {
    public chat(req: Request, res: Response): void {
        const chat = new ChatModel;
        res.send(ChatView(chat.id));
    }

    public sendPrompt(req: Request, res: Response): void {
        const prompt = req.body.prompt;
        const chat = new ChatModel();

        res.send(ChatItemView({ prompt: req.body.prompt }))
        chat.addPrompt(prompt);
    }
}

export const chatController = new ChatController();
