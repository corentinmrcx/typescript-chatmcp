import { NextFunction, Request, Response } from 'express';

export function connectionRequired(req: Request, res: Response, next: NextFunction) : void {
    if (!req.session.user){
        res.redirect('/user/login');
    }

    next();
}