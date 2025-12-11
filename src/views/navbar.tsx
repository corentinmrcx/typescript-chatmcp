import { PropsWithChildren } from "@kitajs/html";
import { User } from "../user/user";
import UserDropdown from "../user/views/user.dropdown";
import { ChatDropdown } from "../chat/views/chat-dropdown";

export function NavBar(props: PropsWithChildren<{ user?: User }>): JSX.Element {
    return (
        <nav>
            <ul>
                <li><strong>ChatMcp</strong></li>
            </ul>
            <ul>
                {props?.children}
            </ul>
            <ul>
                <ChatDropdown user={props.user}/>
            </ul>
            <ul>
                <UserDropdown user={props.user}/>
            </ul>
        </nav>
    );
}