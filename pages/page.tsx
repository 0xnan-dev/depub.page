import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAppState } from "../hooks";
import { downloadArweave } from "../utils/arweave/api";
import ReactMarkdown from "react-markdown";

const Page = () => {
    const router = useRouter();
    const {
        fetchMessage,
    } = useAppState()
    const pageId = router.query.pageId
    const [ arweaveId, setAreaveId ] = useState<string | null>(null)
    const [ markDownContent, SetMarkDownContent ] = useState<string | null>(null)
    async function fetchISCN(iscnId: string) {
        const iscn = await fetchMessage(iscnId)
        for (const fingerprint of (iscn?.data.contentFingerprints || [])) {
            if (/ar:\/\//.test(fingerprint)) setAreaveId(fingerprint.replace('ar://', ''))
        }
    }

    async function getArweaveContent(arweaveId: string) {
        const res = await downloadArweave(arweaveId)
        SetMarkDownContent(res.data)
    }

    useEffect(() => {
        if (typeof pageId === 'string') fetchISCN(pageId)
    }, [pageId])

    useEffect(() => {
        if (arweaveId) getArweaveContent(arweaveId)
    }, [arweaveId])

    return (
        <Layout>
            <div className="max-w-lg mx-auto py-24">
                {
                    markDownContent
                        ? <ReactMarkdown>{markDownContent}</ReactMarkdown>
                        : <p>Page Not Exist</p>
                }
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