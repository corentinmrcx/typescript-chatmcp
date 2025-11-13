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

userRouter.get('/all', userController.getListUser)
userRouter.get('/login', userController.getLogin)
userRouter.get('/logout', userController.logout)
userRouter.get('/profile', userController.profile)

userRouter.post('/login', express.urlencoded(), validateBody(userSchema), userController.login) 