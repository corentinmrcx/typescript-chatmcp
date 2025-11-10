import { PropsWithChildren } from "@kitajs/html";
import { User } from "../user/user";

export function NavBar(props: PropsWithChildren<{ user?: User }>): JSX.Element {
    return (
        <nav>
            <ul>
                <li><strong>ChatMcp</strong></li>
            </ul>
            <ul>
                {props?.children}
            </ul>
        </nav>
    );
}