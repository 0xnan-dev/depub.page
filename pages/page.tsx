import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAppState } from "../hooks";
import { downloadIpfs } from "../utils/arweave/api";
import ReactMarkdown from "react-markdown";
import { MetaLinks } from "../components/Page";
import { MetaLinkProps } from "../components/Page/MetaLink";

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
    const metaLinks: MetaLinkProps[] = []
    if (arweaveId) {
        metaLinks.push({
            link: `https://viewblock.io/arweave/tx/${arweaveId}`,
            label: 'ARWEAVE TX',
            value: arweaveId,
        })
    }
    if (pageId && typeof pageId == 'string') {
        const encodedIscn = encodeURIComponent(pageId)
        metaLinks.push({
            link: `https://app.like.co/view/${encodedIscn}`,
            label: 'ISCN',
            value: pageId.replace('iscn://', ''),
        })
    }

    return (
        <Layout>
            <div className="max-w-lg mx-auto py-24">

                { htmlContent() }

                <MetaLinks links={metaLinks}></MetaLinks>

            </div>
        </Layout>
    )

}

export default Page