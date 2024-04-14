import { ReactNode } from "react"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

type MarkdownAdapterProps = {
    content: string;
}

export const MarkdownAdapter = (
    props: MarkdownAdapterProps
) => {
    const { content } = props;

    return <Markdown remarkPlugins={[remarkGfm]} className={'markdown-editor'}>
        {content}
    </Markdown>
}