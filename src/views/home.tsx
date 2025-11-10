import { User } from "../user/user";
import { NavBar } from "./navbar";

export function HomeView(props: { title: string, user: User | undefined }):JSX.Element {
    return (<>
        {'<!DOCTYPE html>'}
        <html lang="fr">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <title>{ props.title }</title>
            <link rel="stylesheet" href="/css/pico.min.css"></link>
            <script type="text/javascript" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
        </head>
        <body>
            <NavBar>Accueil</NavBar>
            <h1>{ props.title }</h1>
            <p>Bienvenu {props.user?.userName}</p>
            <a href="/chat">Chatbot</a>
            <button hx-get="/time">Heure</button>
        </body>
        </html>
    </>);
}
