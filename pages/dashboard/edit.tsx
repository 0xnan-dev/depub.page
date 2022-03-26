import { FC, useEffect, useMemo, useState } from "react"
import { useAppState, useSigningCosmWasmClient } from "../../hooks";
import Button from '../../components/Common/Button'
import QuillEditor from "../../components/Editor/Quill";
import PageContent from "../../components/Page/Content";
import { downloadIpfs } from "../../utils/arweave/api";

import { LoginedLayout } from '../../components/Layout'
import { useRouter } from "next/router";
import { ISCNRecord } from "@likecoin/iscn-js";



const PublishBtn: FC<{
    onSubmit: Function,
}> = ({ onSubmit }) => {
    const { isLoading, } = useAppState();

    return (
        <Button className="ml-2 primary-btn" isLoading={isLoading} onClick={onSubmit}>Submit</Button>
    )
}

const EditPage: FC = () => {
    const { status, } = useSigningCosmWasmClient()
    const router = useRouter()
    const pageId = router.query.pageId
    const [ iscn, setIscn] = useState< ISCNRecord | null >(null)
    const [ ipfsId, setIpfsId ] = useState<string | null>(null)
    const [value, setValue] = useState("");
    const [ isLoaded, setIsloaded ] = useState(false)
    const [preview, setPreview] = useState(false)
    const { postMessage, fetchMessage, } = useAppState();
    const { offlineSigner } = useSigningCosmWasmClient();

    useEffect(() => {
        if (status == 'guest') router.push('/')
    }, [status, router])

    const iscnUrl = useMemo(() => {
        return pageId? `iscn://likecoin-chain/${pageId}`: ''
    }, [pageId])

    function getIdByProtocal(fingerprints: string[], protocal: string) {
        for (const fingerprint of fingerprints) {
            if ( fingerprint.startsWith(protocal)) return fingerprint.replace(protocal, '')
        }
        return null
    }

    async function getArweaveContent(ipfsId: string) {
        try {
            const res = await downloadIpfs(ipfsId)
            setValue(res.data)
        } catch (error) {
            console.log(error)
        }
        setIsloaded(true)           
    }

    useEffect(() => {
        async function fetchISCN(iscnId: string) {
            const result = await fetchMessage(iscnId)
            setIscn(result)
            setIpfsId(getIdByProtocal(result?.data.contentFingerprints || [], 'ipfs://'))
        }

        if (iscnUrl) fetchISCN(iscnUrl)
    }, [iscnUrl, fetchMessage])

    useEffect(() => {
        if (ipfsId) getArweaveContent(ipfsId)
    }, [ipfsId])


    const ActionButton = useMemo(() => {
        async function onSubmit() {
            if (offlineSigner) {
                try {
                    const version = iscn?.data.contentMetadata.version
                    await postMessage(offlineSigner, value, version)
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
                    <QuillEditor  onChange={onEditorChange} value={value} disabled={!isLoaded}/>
                </div>
                <div className={preview? "": "hidden"}>
                    <PageContent markDownContent={value} isLoaded={true}></PageContent>
                </div>
            </div>
        </LoginedLayout>
    )
}

export default EditPage