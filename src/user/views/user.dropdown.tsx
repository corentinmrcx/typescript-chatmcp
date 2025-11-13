import { User } from "../user";

const UserDropdown = (props : {user : User | undefined}): JSX.Element => {
    if (!props.user) {
        return (
            <a href="/user/login"><button class="secondary"><i class="fa-solid fa-user"></i>Connexion</button></a>
        ); 
    }
    
    return (
    <details class="dropdown">
        <summary><i class="fa-solid fa-user"></i>{props.user?.userName}</summary>
        <ul>
            <li><a href="/user/profile">Profil</a></li>
            <li><a href="/user/logout">Déconnexion</a></li>
        </ul>
    </details>
    );
}

export default UserDropdown; 