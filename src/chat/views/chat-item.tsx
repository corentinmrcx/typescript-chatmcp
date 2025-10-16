export function ChatItemView(props: {prompt: string, id: string}): JSX.Element{
    return(
    <>
        <article class="user_prompt_article">
            <h2>Moi</h2>
            <p>{ props.prompt }</p>
        </article>
        <article class="response_article">
            <h2>IA</h2>
            <p>Coucou</p>
        </article>
        <div hx-get={`/chat/query/${props.id}`} hx-trigger="load" hx-ext="render-markdown" hx-swap="beforeend"></div>
    </>
    );
}