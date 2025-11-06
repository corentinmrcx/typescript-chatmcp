import { Request, Response } from 'express';
import { userRepository } from './user.repository';
import ListView from './views/listView'; 
import loginFormView from './views/loginFormView'
import bcrypt from 'bcrypt'; 

class UserController {
    public async getListUser(req: Request, res: Response): Promise<void> {
        const allUsers = await userRepository.findAll(); 
        res.send(ListView({users: allUsers})); 
    }

    public getLogin(req: Request, res: Response): void {
        res.send(loginFormView())
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const user = await userRepository.findByUserName(username); 
        if (user == null)
            throw new Error("Aucun utilisateur n'a été trouvé.");

        const checkPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!checkPassword)
            throw new Error("Mot de passe incorrect");
        
        req.session.regenerate(function(err){
            req.session.user = user;
            res.redirect("/")
        }); 
    }
}

export const userController = new UserController;