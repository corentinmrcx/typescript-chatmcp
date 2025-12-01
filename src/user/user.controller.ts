import { Request, Response } from 'express';
import { userRepository } from './user.repository';
import ListView from './views/listView'; 
import loginFormView from './views/loginFormView'
import bcrypt from 'bcrypt'; 
import { User } from './user';
import { ObjectId } from 'bson';
import { ProfilePage, EmailEdit, EmailDisplay } from './views/profilePage';
import { ok } from 'assert';

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

    public logout(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }

    public getUserFromSession(req: Request, res: Response): User {
        const user = req.session?.user
        if (!user) throw new Error('Aucun utilisateur dans la session');

        return {
            ...user, 
            _id: new ObjectId(user._id)
        }
    }

    public profile(req: Request, res: Response) : void {
        ok(req.session.user); 
        const user = req.session.user;
        res.send(ProfilePage({user}));
    }

    public editEmail(req: Request, res: Response): void {
        ok(req.session.user); 
        const user = req.session.user; 
        res.send(EmailEdit({user})); 
    }

    public displayEmail(req: Request, res: Response): void {
        ok(req.session.user); 
        const user = req.session.user; 
        res.send(EmailDisplay({user})); 
    }

    public async updateEmail(req: Request, res: Response): Promise<void> {
        ok(req.session.user); 
        const user = req.session.user; 
        const { email } = req.body; 
        await userRepository.updateUserEmail(user, email); 
        req.session.regenerate(function(err){
            req.session.user.email = email;
            res.redirect("/user/displayEmail")
        }); 
    }
}

export const userController = new UserController;