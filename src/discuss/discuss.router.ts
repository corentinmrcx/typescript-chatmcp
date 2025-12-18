import { discussController } from "./discuss.controller";
import express from 'express';
import { connectionRequired } from "../user/user.middleware";

export const discussRouter = express.Router();

discussRouter.get('/', connectionRequired, discussController.discuss);
