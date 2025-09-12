import express, { NextFunction, Request, Response } from 'express';
import { HomeView } from './views/home';
import { ErrorPageView } from './views/error/error-page';


const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    const page = HomeView({ title : 'Homeview'})
    res.send(page);
});

app.get('/chat', (req: Request, res: Response) => {
    const date = new Date;
    res.send('Bonjour. Il est ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
});

app.get('/erreur', (req: Request, res: Response) => {
    throw new Error('Erreur !')
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    const page = ErrorPageView({ title: 'Erreur !'})
    res.send(page);
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});