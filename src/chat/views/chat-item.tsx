export function ChatItemView(props: {prompt: string, id: string, response?: string}): JSX.Element{
    return(
    <>
        <article class="user_prompt_article">
            <h2>Moi</h2>
            <p>{ props.prompt }</p>
        </article>
        <div hx-get={`/chat/query/${props.id}`} hx-trigger="load"></div>
    </>
    );
}