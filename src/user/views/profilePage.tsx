import { User } from "../user";

const ProfilePage = (props: {user: User }) => {
    return(
        <>
            <h2>Nom d'utilisateur</h2>
            <p>{props.user?.userName}</p>
            <hr/>
            <h2>Nom d'utilisateur</h2>
            <p>{props.user?.userName}</p>
        </>
    )
}

export default ProfilePage; 