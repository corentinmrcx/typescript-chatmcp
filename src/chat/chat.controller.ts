import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import ChatView from './views/chat';

class ChatController {
    public chat(req: Request, res: Response): void {
        const chat = new ChatModel;
        res.send(ChatView(chat.id));
    }

    public sendPrompt(req: Request, res: Response): void {
        res.send("<p>coucou</p>")
    }
}

export const chatController = new ChatController();
