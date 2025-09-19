import { Request, Response } from 'express';

class ChatController {
    public chat(req: Request, res: Response): void {
        const date = new Date;
        res.send('Bonjour. Il est ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    }
}

export const chatController = new ChatController();
