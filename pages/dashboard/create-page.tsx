import { FC, useEffect, useMemo, useState } from "react"
import { useAppState, useSigningCosmWasmClient } from "../../hooks";
import Button from '../../components/Common/Button'
import QuillEditor from "../../components/Editor/Quill";
import PageContent from "../../components/Page/Content";

import { LoginedLayout } from '../../components/Layout'
import { useRouter } from "next/router";
import { useAlertContext } from "../../hooks/useAlert.hook";



const PublishBtn: FC<{
    onSubmit: Function,
}> = ({ onSubmit }) => {
    const { isLoading, } = useAppState();

    return (
        <Button className="ml-2 primary-btn" isLoading={isLoading} onClick={onSubmit}>Submit</Button>
    )
}

const CreatePage: FC = () => {
    const { status, } = useSigningCosmWasmClient()
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(false)
    const { postMessage, } = useAppState();
    const { offlineSigner } = useSigningCosmWasmClient();
    const router = useRouter()

    useEffect(() => {
        if (status == 'guest') router.push('/')
    }, [status, router])


    const ActionButton = useMemo(() => {
        async function onSubmit() {
            if (offlineSigner) {
                try {
                    await postMessage(offlineSigner, value)
                    router.push('/dashboard')
                } catch (error) {
                    // console.error(error)
                }
            }
        }
        const previewBtnClass = value? "primary-bordered-btn": "disabled-btn"

        if (preview) {
            return <PublishBtn onSubmit={onSubmit}></PublishBtn>
        } else {
            return <Button className={`${previewBtnClass} ml-2`} onClick={() => setPreview(true)} disabled={!value}>Preview</Button>
        }
    }, [preview, value])

    function onEditorChange(val: string) {
        setValue(val.trim())
    }

    function onBack() {
        if (preview) {
            setPreview(false)
        } else {
            router.back()
        }
    }

    return (
        <LoginedLayout
            navbarAction={ActionButton}
            onBack={onBack}
        >
            <div className="max-w-screen-xl mx-auto p-4">
                <div className={preview? "hidden": ""}>
                    <QuillEditor onChange={onEditorChange}></QuillEditor>
                </div>
                <div className={preview? "": "hidden"}>
                    <PageContent markDownContent={value} isLoaded={true}></PageContent>
                </div>
            </div>
        </LoginedLayout>
    )
}

export default CreatePage