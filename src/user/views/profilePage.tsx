import { User } from "../user";
import { NavBar } from "../../views/navbar";

export const EmailDisplay = (props: {user: User }) => {
    return (
        <p id="emailDisplay">
            — {props.user?.email}
            <a href="#" hx-get="/user/editEmail" hx-target="#emailDisplay" hx-swap="outerHTML"><i class="fa-solid fa-pen"></i></a>
        </p>
    )
}

export const EmailEdit = (props: {user: User}) => {
    return (
        <form id="emailEdit" hx-post="/user/updateEmail" hx-target="#emailEdit" hx-swap="outerhtml">
            <fieldset role="group">
                <input name="email" type="email" value={props.user?.email} autocomplete="email" />
                <button type="submit">Envoyer</button>
                <button type="button" hx-get="/user/displayEmail" hx-target="#emailEdit" hx-swap="outerhtml" class="secondary">Annuler</button>
            </fieldset>
        </form>
    );
}

export const ProfilePage = (props: {user: User }) => {
    return(
        <>
         {'<!DOCTYPE html>'}
        <html lang="fr">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <title>Profile</title>
            <link rel="stylesheet" href="/css/pico.min.css"></link>
            <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
            <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
            <script type="text/javascript" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
        </head>
        <body>
            <NavBar user={props.user}>Accueil</NavBar>
            <hgroup>
                <h6>Nom d'utilisateur</h6>
                <p>— {props.user?.userName}</p>
            </hgroup>
            <hr/>
            <hgroup>
                <h6>Courriel</h6>
                <EmailDisplay user={props.user}/>
            </hgroup>
        </body>
        </html>
        </>
    )
}

