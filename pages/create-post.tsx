import { useState } from "react"
import ReactMde from "react-mde"
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css"

import Layout from '../components/Layout'


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const toolbar = [ 
    // ['header', 'bold', 'italic', 'strikethrough'],
    // ['link', 'quote', 'code'],
    // ['unordered-list', 'ordered-list', 'checked-list'],
    ['header', 'bold', 'italic', ],
    ['link', ],
]

const CreatePost = () => {
    const [value, setValue] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    return (
        <Layout>
            <div className="max-w-2xl mx-auto py-5">
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    toolbarCommands={toolbar}
                    generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown)) }
                />
            </div>
        </Layout>
    )
}

export default CreatePost