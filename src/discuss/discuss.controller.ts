import { Request, Response } from 'express';
import DiscussPage from './views/discuss-page';

class DiscussControler{
    public async discuss(req: Request, res: Response): Promise<void> {
        const user = req.session.user; 
        if (!user) throw new Error("Utilisateur introuvable");
        res.send(DiscussPage(user)); 
    }
}

export const discussController = new DiscussControler();
