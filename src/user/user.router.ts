import { userController } from './user.controller';
import express from 'express';

export const userRouter = express.Router(); 

userRouter.get('/all', userController.getListUser)