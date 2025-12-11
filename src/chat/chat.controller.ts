import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import ChatView from './views/chat';
import { ChatItemView } from './views/chat-item';
import { ok } from 'assert';

class ChatController {
    public async chat(req: Request, res: Response): Promise<void> {
        ok(req.session.user); 
        const userId = req.session.user?._id?.toString(); 
        if (!userId) throw new Error("L'ID de l'utilsateur est introuvable")
            
        const chat = await ChatModel.create(userId);
        res.send(ChatView(chat.id, req.session.user));
    }

    public async sendPrompt(req: Request, res: Response): Promise<void> {
        ok(req.session.user); 
        const userId = req.session.user?._id?.toString();
        if (!userId) throw new Error("L'ID de l'utilsateur est introuvable")
 
        const chat = await ChatModel.create(userId, req.params.id);
        if (!req.params.id) {
            res.status(400).send('ID is required');
            return;
        }

        const prompt = req.body.prompt;
            
        res.send(ChatItemView({ prompt: req.body.prompt, id: chat.id }))
        chat.addPrompt(prompt);
    }

    public async query(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        if (!chatId) {
            res.status(400).send('ID is required');
            return;
        }

        const userId = req.session.user?._id?.toString(); 
        if (!userId) throw new Error("L'ID de l'utilsateur est introuvable")

        const chat = await ChatModel.create(userId, chatId);

        const notifications : string[] = [];
        const toolCallNotification = (toolName: string) => {
            notifications.push(toolName);
        }
        const answer = await chat.fetchAnswer(toolCallNotification);

        let responseText = '';
        if (notifications.length > 0) {
            responseText += '```' + notifications.join('\n') + '\n```\n\n';
        }
        responseText += answer;

        res.send(responseText);
    }
}

export const chatController = new ChatController();
