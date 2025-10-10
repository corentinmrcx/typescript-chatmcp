export function ErrorDialogView(props: { title: string, errorDetail: string }):JSX.Element {    
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
            <dialog open>
                <article>
                    <h2>{ props.title }</h2>
                    <p>{ props.errorDetail } </p>
                    <footer>
                        <form method="dialog">
                            <button>Fermer</button>
                        </form>
                    </footer>
                </article>
            </dialog>
        </body>
        </html>
    </>);
}
