import { Request, Response } from 'express';
import { userRepository } from './user.repository';
import ListView from './views/listView'; 

class UserController {
    public async getListUser(req: Request, res: Response): Promise<void> {
        const allUsers = await userRepository.findAll(); 
        res.send(ListView({users: allUsers})); 
    }
}

export const userController = new UserController;