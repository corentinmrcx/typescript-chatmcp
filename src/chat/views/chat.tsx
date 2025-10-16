type ModelMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string | { type: 'text'; text: string }[];
};

function MessageItem(props: { message: ModelMessage }): JSX.Element {
    const { role, content } = props.message;
    let text = '';
    if (typeof content === 'string') {
        text = content;
    } else if (Array.isArray(content)) {
        text = content.map((part) => part.text).join(' ');
    }

    if (role === 'user') {
        return (
            <article className="user_message">
                <p>{text}</p>
            </article>
        );
    } else if (role === 'assistant') {
        return (
            <script type="text/markdown">
{text}
            </script>
        );
    } else {
        return <></>;
    }
}

function MessageItems(props: { messages: ModelMessage[] }): JSX.Element {
    return (
        <div className="messages">
            {props.messages.map((message) => (
                <MessageItem message={message} />
            ))}
        </div>
    );
}

const ChatView = (id : string, messages?: ModelMessage[]) => {
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
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/katex.min.css" rel="stylesheet"/>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-dark.css"
                media="(prefers-color-scheme: dark)" rel="stylesheet"/>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-light.css"
                media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" rel="stylesheet"/>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/katex.min.css" rel="stylesheet"/>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-dark.css" media="(prefers-color-scheme: dark)" rel="stylesheet"/>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-light.css" rel="stylesheet" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"/>
                <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/render-markdown.js" type="module"></script>
            </head>
            <body>
                <div className="container">
                    <div id="chat">  
                    {messages && messages.length > 0 ? <MessageItems messages={messages} /> : (
                        <tag of="render-markdown">
# Bienvenue sur ChatMCP
                        </tag>     
                    )}            
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

console.log(MessageItem({ message: { role: 'user', content: 'Bonjour' } }));
console.log(MessageItem({ message: { role: 'assistant', content: 'Bonjour, que puis-je faire pour vous ?' } }));
console.log(MessageItem({ message: { role: 'assistant', content: [{ type: 'text', text: 'Votre code doit aussi gérer ce type de message.' }] } }));

export default ChatView;