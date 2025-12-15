import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import ChatView from './views/chat';
import { ChatItemView } from './views/chat-item';
import { ok } from 'assert';
import { ChatPage } from './views/chatPage';
import { chatRepository } from './chat.repository';
import { ChatTitleDisplay, ChatTitleEdit } from './views/chat-title';

class ChatController {
    public async chat(req: Request, res: Response): Promise<void> {
        if (!req.session.user || !req.session.user._id) {
            throw new Error("Utilisateur introuvable");
        }

        const user = req.session.user;
        const userId = user._id?.toString();
        if (!userId) throw new Error("L'id de l'utilisateur est introuvable")
        const chatId = req.params.id;

        let chatModel; 
        if (chatId) {
            chatModel = await ChatModel.create(userId, chatId);
        } else {
            const lastChat = await chatRepository.findLastByUser(userId);

            if (lastChat && lastChat._id) {
                const lastChatId = lastChat._id.toHexString();
                chatModel = await ChatModel.create(userId, lastChatId);
            } else {
                chatModel = await ChatModel.create(userId);
            }
        }

        const idChat = chatModel.id;
        const chat = await chatRepository.find(idChat);

        res.send(ChatView(idChat, user, chat?.title || "Nouvelle conversation"));
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

    public async newChat(req: Request, res: Response): Promise<void> {
        const user = req.session.user;  
        if (!user) throw new Error("L'utilsateur est introuvable")  

        const userId = user?._id?.toString();     
        if (!userId) throw new Error("L'ID de l'utilsateur est introuvable")   

        const chatModel = await ChatModel.create(userId);
        const chat = await chatRepository.find(chatModel.id);
        res.send(ChatPage({ id: chatModel.id, user: user, title: chat?.title || "Nouvelle conversation" })); 
    }

    public async editTitle(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        if (!chatId) {
            res.status(400).send('ID is required');
            return;
        }

        const chat = await chatRepository.find(chatId);
        res.send(ChatTitleEdit({ title: chat.title, _id: chatId }));
    }

    public async displayTitle(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        if (!chatId) {
            res.status(400).send('ID is required');
            return;
        }

        const chat = await chatRepository.find(chatId);
        res.send(ChatTitleDisplay({ title: chat.title, _id: chatId }));
    }

    public async updateTitle(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        if (!chatId) {
            res.status(400).send('ID is required');
            return;
        }

        const newTitle = req.body.title;
        if (!newTitle || newTitle.trim().length === 0) {
            res.status(400).send('Title is required');
            return;
        }

        const updated = await chatRepository.updateTitle(chatId, newTitle);
        if (updated) {
            const chat = await chatRepository.find(chatId);
            res.send(ChatTitleDisplay({ title: chat.title, _id: chatId }));
        } else {
            throw new Error("Erreur lors de l'enregistrement du nouveau titre");
        }
    }
    
    public async list(req: Request, res: Response): Promise<void> {
        const user = req.session.user;  
        if (!user) throw new Error("L'utilsateur est introuvable")  

        const userId = user?._id?.toString();     
        if (!userId) throw new Error("L'ID de l'utilsateur est introuvable") 
        
        const result = await chatRepository.aggregateByUserId(userId)
        console.log(result);
    }
}

export const chatController = new ChatController();
