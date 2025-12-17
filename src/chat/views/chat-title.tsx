export function ChatTitleDisplay(props: { title: string, _id: string }): JSX.Element {
    return (
        <li id={`titleDisplay-${props._id}`} style={{"listStyle": "none"}}>
            <span style="margin-right: 0.5rem;">{props.title}</span>
            <a href="#" hx-get={`/chat/editTitle/${props._id}`} hx-target={`#titleDisplay-${props._id}`} hx-swap="outerHTML" title="Éditer le titre">
                <i class="fa-solid fa-pen-to-square"></i>
            </a>
        </li>
    );
}

export function ChatTitleEdit(props: { title: string, _id: string }): JSX.Element {
    return (
        <li id={`titleEdit-${props._id}`} style={{"listStyle": "none"}}>
            <form hx-post={`/chat/updateTitle/${props._id}`} hx-target={`#titleEdit-${props._id}`} hx-swap="outerHTML" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <input name="title" type="text" value={props.title} style="margin: 0; width: 200px;" required />
                <button type="submit" style="margin: 0; padding: 0.25rem 0.5rem;">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button type="button" hx-get={`/chat/displayTitle/${props._id}`} hx-target={`#titleEdit-${props._id}`} hx-swap="outerHTML" class="secondary" style="margin: 0; padding: 0.25rem 0.5rem;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </form>
        </li>
    );
}