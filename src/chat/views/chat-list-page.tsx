import { User } from "../../user/user";
import { ChatInfo } from "../chat";
import { NavBar } from "../../views/navbar";
import { ChatTitleDisplay } from "./chat-title";

export function ChatCount({ count }: { count: number }): JSX.Element {
    return (
        <div id="chat-count" hx-swap-oob="true">
            <li>
                <span><strong>{count} conversations</strong></span>
                &nbsp;
                <button hx-get="/chat/searchForm" hx-target="#chat-count" hx-swap="outerHTML">
                    <i class="fa-solid fa-search"></i>
                </button>
            </li>
        </div>
    );
}

export function ChatSearchForm(): JSX.Element {
    return (
        <div id="chat-count">
            <li style={{"listStyle": "none"}}>
                <form hx-get="/chat/list" hx-target="main" hx-swap="innerHTML" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <input name="searchText" type="text" placeholder="Rechercher" style="margin: 0; width: 200px;" />
                    <button type="submit" style="margin: 0; padding: 0.25rem 0.5rem;">
                        <i class="fa-solid fa-check"></i>
                    </button>
                </form>
            </li>
        </div>
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

export function ChatList({ chats, page, count, pageSize, searchText }: { chats: ChatInfo[], page: number, count: number, pageSize: number, searchText?: string }): JSX.Element {
    const hasMorePages = count > page * pageSize;
    const searchParam = searchText ? `&searchText=${encodeURIComponent(searchText)}` : '';
    
    return (
        <div>
            {chats.map((chat) => (
                <ChatListItem chat={chat} />
            ))}
            {hasMorePages && (
                <a 
                    href="#" 
                    hx-get={`/chat/list?page=${page + 1}${searchParam}`} 
                    hx-swap="outerHTML"
                >
                    Cliquez pour afficher les conversations suivantes
                </a>
            )}
        </div>
    );
}

export function ChatListPage({ user, chatInfos, page, count, pageSize, searchText }: { user: User, chatInfos: ChatInfo[], page: number, count: number, pageSize: number, searchText?: string }): JSX.Element {
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
                    <ChatList chats={chatInfos} page={page} count={count} pageSize={pageSize} searchText={searchText} />
                </main>
            </body>
            </html>
        </>
    );
}