import express, { NextFunction, Request, Response } from 'express';
import { HomeView } from './views/home';
import { ErrorDialogView } from './views/error/error-dialog';
import { chatRouter } from './chat/chat.router';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use('/chat', chatRouter);

app.get('/', (req: Request, res: Response) => {
    const page = HomeView({ title : 'Homeview'})
    res.send(page);
});

app.get('/time', (req: Request, res: Response) => {
    const date = new Date;
    res.send(date.getHours());
});

app.get('/erreur', (req: Request, res: Response) => {
    throw new Error('Erreur !')
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    const page = ErrorDialogView({ title: 'Erreur', errorDetail: err.message })
    res.send(page);
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});