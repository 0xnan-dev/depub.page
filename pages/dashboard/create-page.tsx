import { FC, useEffect, useState } from "react"
import { useAppState, useSigningCosmWasmClient } from "../../hooks";
import Button from '../../components/Common/Button'
import QuillEditor from "../../components/Editor/Quill";
import PageContent from "../../components/Page/Content";

import { LoginedLayout } from '../../components/Layout'
import { useRouter } from "next/router";



const PublishBtn: FC<{
    onSubmit: Function,
}> = ({ onSubmit }) => {
    const { isLoading, } = useAppState();

    return (
        <Button className=" primary-btn" isLoading={isLoading} onClick={onSubmit}>Submit</Button>
    )
}

const CreatePage: FC = () => {
    const { status, } = useSigningCosmWasmClient()
    const [value, setValue] = useState("");
    const { isLoading, postMessage, } = useAppState();
    const { offlineSigner } = useSigningCosmWasmClient();
    const router = useRouter()

    useEffect(() => {
        if (status == 'guest') router.push('/')
    }, [status, router])

    async function onSubmit() {
        if (offlineSigner) {
            await postMessage(offlineSigner, value)
            router.push('/dashboard')
        }
    }

    return (
        <LoginedLayout
            navbarAction={<PublishBtn onSubmit={onSubmit}></PublishBtn>}
            backUrl="/dashboard"
        >
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex">
                    <div className="w-1/2">
                        <QuillEditor onChange={setValue}></QuillEditor>
                    </div>
                    <div className="w-1/2 pt-10">
                        <PageContent markDownContent={value} isLoaded={true}></PageContent>
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto text-center flex justify-between px-4">

            </div>
        </LoginedLayout>
    )
}

export default CreatePage