import { User } from "../../user/user";
import { NavBar } from "../../views/navbar";

export function ChatPage(props: { id: string, user: User | undefined }): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <title></title>
                <link rel="stylesheet" href="/css/pico.min.css"></link>
                <link rel="stylesheet" href="/css/chat.css"></link>
                <script type="text/javascript" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                <NavBar user={props.user}></NavBar>
                <div className="container">
                    <div id="chat">
                    
                    </div>
                    <form method="post">
                        <label for="prompt">Posez votre question...</label>
                        <input type="text" name="prompt" id="prompt" required />
                        <button  type="submit" 
                                id="send"
                                hx-post={`/chat/send/${props.id}`}
                                hx-target="#chat"
                                hx-swap="beforeend">
                            Envoyer
                        </button>

                    </form>  
                    <p id="id">ID : {props.id}</p>  
                </div>        
            </body>
            </html>
        </>
    )
}