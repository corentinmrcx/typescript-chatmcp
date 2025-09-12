import express, { Request, Response } from 'express';
import { HomeView } from './views/home';

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

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});