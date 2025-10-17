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
        const { id } = req.params;
        if (!id) {
            res.status(400).send('ID is required');
            return;
        }
        const prompt = req.body.prompt;
        const chat = new ChatModel(id);

        res.send(ChatItemView({ prompt: req.body.prompt, id: id }))
        chat.addPrompt(prompt);
    }

    public async query(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('ID is required');
            return;
        }
        const chat = new ChatModel(id);
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
