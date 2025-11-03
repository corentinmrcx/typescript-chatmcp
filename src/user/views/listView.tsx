import { User } from "../user";

const ListView = (props: {users: User[]}) => {
     return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <title>Liste des utilisateurs</title>
                <link rel="stylesheet" href="/css/pico.min.css"></link>
            </head>
            <body>
                <div>
                    <ul>
                        {props.users.map((user) => <li>{user.userName}</li>)}
                    </ul>
                </div>
                
            </body>
            </html>
        </>
     )
}

export default ListView;