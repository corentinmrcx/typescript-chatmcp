import { PropsWithChildren } from "@kitajs/html";
import { User } from "../user/user";
import UserDropdown from "../user/views/user.dropdown";
import { ChatDropdown } from "../chat/views/chat-dropdown";
import { ChatTitleDisplay } from "../chat/views/chat-title";

export function NavBar(props: PropsWithChildren<{ user?: User, chatTitle?: string, chatId?: string }>): JSX.Element {
    return (
        <nav>
            <ul>
                <li><strong>ChatMcp</strong></li>
            </ul>
            <ul>
                {props?.children}
                {props.chatTitle && props.chatId && <ChatTitleDisplay title={props.chatTitle} _id={props.chatId} />}
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