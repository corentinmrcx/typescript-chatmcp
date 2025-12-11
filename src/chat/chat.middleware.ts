import { NextFunction, Request, Response } from 'express';
import { chatRepository } from './chat.repository';

export async function isChatOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
    const chatId = req.params.id;
    
    if (!chatId) {
        throw new Error("L'identifiant de la conversation est nécessaire");
    }

    if (!req.session.user || !req.session.user._id) {
        throw new Error("Aucun utilisateur");
    }

    const userId = req.session.user._id.toString();
    const chat = await chatRepository.find(chatId);

    if (chat.userId.toHexString() !== userId) {
        throw new Error("Impossible d'accéder à cette conversation");
    }

    next();
}
