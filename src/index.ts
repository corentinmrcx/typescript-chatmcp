import express, { NextFunction, Request, Response } from 'express';
import { HomeView } from './views/home';
import { ErrorPageView } from './views/error/error-page';
import { ErrorDialogView } from './views/error/error-dialog';
import { chatRouter } from './chat/chat.router';
import { chatController } from './chat/chat.controller';
import { userRouter } from './user/user.router';
import session from 'express-session'; 
import { connectionRequired } from './user/user.middleware';
import { valkeyStore } from './services/valkey';
import { discussRouter } from './discuss/discuss.router';
import { createServer } from 'http';
import { DiscussServer } from './discuss/discuss.server';

const app = express();
const httpServer = createServer(app); 

const sessionMiddleware = session({
    secret: 'cc46091749e55f33fe4046b9c8855a13',
    saveUninitialized: false,
    resave: false, 
    store: valkeyStore
}); 
app.use(sessionMiddleware);
DiscussServer.create(httpServer, sessionMiddleware); 

const port = process.env.PORT;

app.use(express.static('public'));
app.use('/chat', connectionRequired, chatRouter);
app.use('/user', userRouter)
app.use('/discuss', discussRouter);

app.get('/', (req: Request, res: Response) => {
    const page = HomeView({ title : 'Homeview', user: req.session.user })
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

httpServer.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});