export function HomeView(props: { title: string }):JSX.Element {
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
            <h1>{ props.title }</h1>
            <a href="/chat">Chatbot</a>
            <button hx-post="/time">Heure</button>
        </body>
        </html>
    </>);
}
