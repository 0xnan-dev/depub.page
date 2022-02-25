import { useState } from "react"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import { useAppState, useSigningCosmWasmClient } from "../../hooks";
import converter from "../../utils/showdown";
import Button from '../../components/Common/Button'

import Layout from '../../components/Layout'
import { useRouter } from "next/router";


const toolbar = [ 
    // ['header', 'bold', 'italic', 'strikethrough'],
    // ['link', 'quote', 'code'],
    // ['unordered-list', 'ordered-list', 'checked-list'],
    ['header', 'bold', 'italic', ],
    ['link', ],
]

const CreatePage = () => {
    const [value, setValue] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    const { isLoading, postMessage, fetchUser } = useAppState();
    const { offlineSigner } = useSigningCosmWasmClient();
    const router = useRouter()

    async function onSubmit() {
        if (offlineSigner) {
            await postMessage(offlineSigner, value)
            router.push('/dashboard')
        }
    }
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
            <div className="text-center">
                <Button className="primary-btn" isLoading={isLoading} onClick={onSubmit}>Submit</Button>
            </div>
        </Layout>
    )
}

export default CreatePage