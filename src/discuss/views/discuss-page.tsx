import { User } from "../../user/user";
import { NavBar } from "../../views/navbar";

const DiscussPage = (user: User) => {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <title>ChatMCP - Salon de discussion</title>
                    <link rel="stylesheet" href="/css/pico.min.css"></link>
                    <link rel="stylesheet" href="/css/chat.css"></link>
                    <script type="text/javascript" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
                </head>
                <body>
                    <NavBar user={user}></NavBar>
                    <div class="container">
                        <div id="discuss-messages">

                        </div>
                        
                        <form method="post" hx-post="/discuss/send" hx-target="#discuss-messages" hx-swap="beforeend">
                            <input 
                                type="text" 
                                name="message" 
                                id="message" 
                                placeholder="Entrez votre message..." 
                                required 
                            />
                            <button type="submit" id="send">
                                Envoyer
                            </button>
                        </form>
                    </div>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/socket.io.min.js"></script>
                    <script src="/js/discuss.js"></script>
                </body>
            </html>
        </>
    );
}

export default DiscussPage;