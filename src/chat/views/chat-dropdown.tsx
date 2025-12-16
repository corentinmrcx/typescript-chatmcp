import { User } from "../../user/user";

export function ChatDropdown(props: { user?: User }): JSX.Element | null {
    if (!props.user) {
        return null; 
    }
    
    return (
        <details class="dropdown">
            <summary>
                <i class="fa-solid fa-comments"></i> Conversations
            </summary>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                <li>
                    <a href="/chat/new">Nouvelle conversations</a>
                </li>
                <li>
                    <a href="/chat/list">Voir toutes les conversations</a>
                </li>
            </ul>
        </details>
    ); 
}