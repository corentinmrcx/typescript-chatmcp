import { User } from "../../user/user";
import { ChatInfo } from "../chat";
import { NavBar } from "../../views/navbar";
import { ChatTitleDisplay } from "./chat-title";

function ChatCount({ count }: { count: number }): JSX.Element {
    return (
        <li>
            <strong>{count} conversations</strong>
        </li>
    );
}

function ChatListItem({ chat }: { chat: ChatInfo }): JSX.Element {
    const { _id, title, creationDate, lastModificationDate, messageCount } = chat;
    if (!_id)  throw new Error("L'ID du chat est introuvable");

    return (
        <article>
            <header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <ChatTitleDisplay title={title} _id={_id?.toString()} /> 
                <a href={`/chat/${_id}`}>
                    <button><i class="fa-solid fa-arrow-right"></i></button>
                </a>
            </header>
            <p>
                Créée le {new Date(creationDate).toLocaleString('fr-FR')} / 
                Modifiée le {new Date(lastModificationDate).toLocaleString('fr-FR')}
            </p>
            <footer style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span>{messageCount} messages</span>
                <a href="">
                    <button><i class="fa-solid fa-trash"></i></button>
                </a>
            </footer>
        </article>
    );
}

export function ChatList({ chats, page, count, pageSize }: { chats: ChatInfo[], page: number, count: number, pageSize: number }): JSX.Element {
    const hasMorePages = count > page * pageSize;
    
    return (
        <div>
            {chats.map((chat) => (
                <ChatListItem chat={chat} />
            ))}
            {hasMorePages && (
                <a 
                    href="#" 
                    hx-get={`/chat/list?page=${page + 1}`} 
                    hx-swap="outerHTML"
                >
                    Cliquez pour afficher les conversations suivantes
                </a>
            )}
        </div>
    );
}

export function ChatListPage({ user, chatInfos, page, count, pageSize }: { user: User, chatInfos: ChatInfo[], page: number, count: number, pageSize: number }): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <title></title>
                <link rel="stylesheet" href="/css/pico.min.css"></link>
                <link rel="stylesheet" href="/css/chat.css"></link>
                <script type="text/javascript" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                <NavBar user={user}>
                    <ChatCount count={count} />
                </NavBar>
                <main class="container">
                    <ChatList chats={chatInfos} page={page} count={count} pageSize={pageSize} />
                </main>
            </body>
            </html>
        </>
    );
}