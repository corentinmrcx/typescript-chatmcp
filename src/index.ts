import express, { NextFunction, Request, Response } from 'express';
import { HomeView } from './views/home';
import { ErrorPageView } from './views/error/error-page';
import { ErrorDialogView } from './views/error/error-dialog';
import { chatRouter } from './chat/chat.router';
import { chatController } from './chat/chat.controller';
import { userRouter } from './user/user.router';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use('/chat', chatRouter);
app.use('/user', userRouter)

app.get('/', (req: Request, res: Response) => {
    const page = HomeView({ title : 'Homeview'})
    res.send(page);
});

app.get('/time', (req: Request, res: Response) => {
    const date = new Date;
    res.send(date.getHours());
});

app.get('/chat/query/:id', (req: Request, res: Response) => {
    chatController.query(req, res);
});

app.get('/erreur', (req: Request, res: Response) => {
    throw new Error('Erreur !')
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.headers['hx-request']){
        console.log(err.message);
        const page = ErrorDialogView({ title: 'Erreur', errorDetail: err.message })
        res.send(page);
    }
    else {
        res.status(500).send(ErrorPageView)
    }
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});