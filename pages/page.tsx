import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useAppState } from "../hooks";
import { downloadIpfs } from "../utils/arweave/api";
import { MetaLinks } from "../components/Page";
import { MetaLinkProps } from "../components/Page/MetaLink";
import PageContent from '../components/Page/Content';

const Page = () => {
    const router = useRouter();
    const {
        fetchMessage,
    } = useAppState()
    let pageId = router.query.pageId
    const [ ipfsId, setIpfsId ] = useState<string | null>(null)
    const [ arweaveId, setArweaveId] = useState<string | null>(null)
    const [ isLoaded, setIsloaded ] = useState(false)
    const [ markDownContent, SetMarkDownContent ] = useState<string | null>(null)

    if (!pageId && typeof window !== "undefined") {
        pageId = (window?.location?.pathname || '').replace('/page/', '')
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
        }
        setIsloaded(true)           
    }

    const iscnUrl = useMemo(() => {
        return pageId? `iscn://likecoin-chain/${pageId}`: ''
    }, [pageId])

    useEffect(() => {
        async function fetchISCN(iscnId: string) {
            const iscn = await fetchMessage(iscnId)
            setArweaveId(getIdByProtocal(iscn?.data.contentFingerprints || [], 'ar://'))
            setIpfsId(getIdByProtocal(iscn?.data.contentFingerprints || [], 'ipfs://'))
        }

        if (iscnUrl) fetchISCN(iscnUrl)
    }, [iscnUrl, fetchMessage])

    useEffect(() => {
        if (ipfsId) getArweaveContent(ipfsId)
    }, [ipfsId])


    const metaLinks: MetaLinkProps[] = useMemo(() => {
        const results = []
        if (arweaveId) {
            results.push({
                link: `https://viewblock.io/arweave/tx/${arweaveId}`,
                label: 'ARWEAVE TX',
                value: arweaveId,
            })
        }
        if (pageId && typeof pageId == 'string') {
            const encodedIscn = encodeURIComponent(pageId)
            results.push({
                link: `https://app.like.co/view/${encodedIscn}`,
                label: 'ISCN',
                value: pageId.replace('iscn://', ''),
            })
        }
        return results
    }, [arweaveId, pageId])

    return (
        <Layout>
            <div className=" max-w-screen-xl mx-auto min-h-full flex flex-col p-4">
                <div className="grow">
                    <PageContent
                        isLoaded={isLoaded}
                        markDownContent={markDownContent}
                        notFoundMessage="Page Not Found"
                    ></PageContent>
                </div>
                <div className="py-3 max-w-lg mx-auto">
                    <MetaLinks links={metaLinks}></MetaLinks>
                </div>
            </div>
        </Layout>
    )

}

export default Page