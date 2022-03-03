import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAppState } from "../hooks";
import { downloadIpfs } from "../utils/arweave/api";
import ReactMarkdown from "react-markdown";

const Page = () => {
    const router = useRouter();
    const {
        fetchMessage,
    } = useAppState()
    const pageId = router.query.pageId
    const [ ipfsId, setIpfsId ] = useState<string | null>(null)
    const [ arweaveId, setArweaveId] = useState<string | null>(null)
    const [ isLoaded, setIsloaded ] = useState(false)
    const [ markDownContent, SetMarkDownContent ] = useState<string | null>(null)
    async function fetchISCN(iscnId: string) {
        const iscn = await fetchMessage(iscnId)
        setArweaveId(getIdByProtocal(iscn?.data.contentFingerprints || [], 'ar://'))
        setIpfsId(getIdByProtocal(iscn?.data.contentFingerprints || [], 'ipfs://'))
    }

    function getIdByProtocal(fingerprints: string[], protocal: string) {
        for (const fingerprint of fingerprints) {
            if ( fingerprint.startsWith(protocal)) return fingerprint.replace(protocal, '')
        }
        return null
    }

    async function getArweaveContent(ipfsId: string) {
        try {
            const res = await downloadIpfs(ipfsId)
            SetMarkDownContent(res.data)
        } catch (error) {
            console.log(error)
        }
        setIsloaded(true)           
    }

    useEffect(() => {
        if (typeof pageId === 'string') fetchISCN(pageId)
    }, [pageId])

    useEffect(() => {
        if (ipfsId) getArweaveContent(ipfsId)
    }, [ipfsId])

    const htmlContent = () => {
        if (isLoaded) {
            return (
                markDownContent
                    ? <ReactMarkdown>{markDownContent}</ReactMarkdown>
                    : <p>Page Not Exist</p>
            )
        } else {
            return (<p>Loading ... </p>)
        }
    }

    return (
        <Layout>
            <div className="max-w-lg mx-auto py-24">

                { htmlContent() }

                <div className="py-10">
                    <div className=" text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ">
                        <a
                            href={`https://viewblock.io/arweave/tx/${arweaveId}`} 
                            target="_blank"
                            rel="noreferrer"
                            className="block py-2 px-4 w-full rounded-t-lg rounded-b-lg border-b border-gray-200 hover:bg-gray-100">
                            <div className="text-gray-500 flex items-center justify-between">
                                <span>
                                    ARWEAVE TX
                                </span>
                                <span>{arweaveId}</span>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </Layout>
    )

}

export default Page