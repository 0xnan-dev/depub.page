import { FC } from "react";
import ReactMarkdown from "react-markdown";

const NotFoundContent: FC<{
    message?: string
}> = ({ message }) => (
    <div className="p-5"><p>{message}</p></div>
)

const MarkdownContent: FC<{
    content: string
}> = ({ content, }) => {
    return (
        <div className="ql-snow">
            <div className="ql-editor">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div> 
    )
}

const PageContent: FC<{
    isLoaded: boolean,
    markDownContent: string | null,
    notFoundMessage?: string
}> = ({ isLoaded, markDownContent, notFoundMessage }) => {

    if (isLoaded) {
        return (
            markDownContent
                ? <MarkdownContent content={markDownContent}></MarkdownContent>
                : <NotFoundContent message={notFoundMessage}></NotFoundContent>
        )
    } else {
        return (<p>Loading ... </p>)
    }
}

export default PageContent