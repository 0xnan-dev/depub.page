import { FC, useState } from "react";
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import converter from "../../utils/showdown";

const toolbar = [ 
    // ['header', 'bold', 'italic', 'strikethrough'],
    // ['link', 'quote', 'code'],
    // ['unordered-list', 'ordered-list', 'checked-list'],
    ['header', 'bold', 'italic', ],
    ['link', ],
]

const MarkdownEditor: FC<{
    value: string,
    onChange: (val: string) => void,
}> = ({ value, onChange }) => {

    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    return (
        <ReactMde
            value={value}
            onChange={onChange}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            toolbarCommands={toolbar}
            generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown)) }
        />
    )
}

export default MarkdownEditor