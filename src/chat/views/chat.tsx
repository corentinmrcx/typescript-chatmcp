const ChatView = (id : string) => {
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
            </head>
            <body>
                <div className="container">
                    <div id="chat">
                    
                    </div>
                    <form method="post">
                        <label for="prompt">Posez votre question...</label>
                        <input type="text" name="prompt" id="prompt" required />
                        <button  type="submit" 
                                id="send"
                                hx-post={`/chat/send/${id}`}
                                hx-target="#chat"
                                hx-swap="innerHTML">
                            Envoyer
                        </button>

                    </form>  
                    <p id="id">ID : {id}</p>  
                </div>
                
            </body>
            </html>
        </>
     )
}

export default ChatView;