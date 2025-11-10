const loginFormView = () => {
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
                <form action="/user/login" method="post">
                    <label for="username">Nom d'utilisateur</label>
                    <input type="texte" name="username" id="username" required />

                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password" required/> 

                    <input type="submit" value="Sign in" />
                </form>
            </body>
            </html>
        </>
    ); 
}

export default loginFormView; 