export function ErrorPageView(props: { title: string }):JSX.Element {
    return (<>
        {'<!DOCTYPE html>'}
        <html lang="fr">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="/css/pico.min.css"></link>
            <script type="text/javascript" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
            <title>{ props.title }</title>
        </head>
        <body>
            <h1>{ props.title }</h1>
        </body>
        </html>
    </>);
}
