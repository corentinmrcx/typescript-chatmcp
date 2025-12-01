import z from 'zod';
import { validateBody } from '../utils/validator';
import { userController } from './user.controller';
import express from 'express';

export const userRouter = express.Router(); 

const userSchema = z.object(
    {
        username: z.string().min(1),
        password: z.string().min(1)
    }
);

const updateEmailSchema = z.object({
    email: z.string().email()
})

userRouter.get('/all', userController.getListUser)
userRouter.get('/login', userController.getLogin)
userRouter.get('/logout', userController.logout)
userRouter.get('/profile', userController.profile)
userRouter.get('/editEmail', userController.editEmail)
userRouter.get('/displayEmail', userController.displayEmail)

userRouter.post('/login', express.urlencoded(), validateBody(userSchema), userController.login) 
userRouter.post('/updateEmail', express.urlencoded(), validateBody(updateEmailSchema), userController.updateEmail)