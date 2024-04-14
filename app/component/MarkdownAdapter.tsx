import { ReactNode } from "react"
import Markdown from "react-markdown"

type MarkdownAdapterProps = {
    content: string;
}

export const MarkdownAdapter = (
    props: MarkdownAdapterProps
) => {
    const { content } = props;

    return <Markdown className={'markdown-editor'}>
        {content}
    </Markdown>
}