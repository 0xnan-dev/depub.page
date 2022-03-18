import Link from "next/link"
import { FC, useCallback, useEffect, useState } from "react"
import { LoginedLayout } from "../../components/Layout"
import { useAppState, useSigningCosmWasmClient } from "../../hooks"
import { ISCNRecord } from "@likecoin/iscn-js"
import Button from "../../components/Common/Button"
import { PageSummary } from "../../components/PageList"
import { useRouter } from "next/router"


const LogoutBtn: FC = (props: any) => {
    const {
        disconnect,
    } = useSigningCosmWasmClient()
    const router = useRouter()

    async function logout() {
        await disconnect()
        router.push('/')
    }
    return (
        <Button className="white-btn" onClick={logout}>Logout</Button>
    )
}

const DashboardPages = (props: any) => {
    const {
        walletAddress,
        status,
    } = useSigningCosmWasmClient()
    const {
        fetchMessagesByOwner,
    } = useAppState()
    const [ pages, setPages ] = useState<ISCNRecord[]>([])
    const router = useRouter()

    async function fetchPages(address: string) {
        let results = await fetchMessagesByOwner(address)
        console.log(results)
        if (results) setPages(results)
    }

    useEffect(() => {
        if (walletAddress) fetchPages(walletAddress)
    }, [walletAddress])

    useEffect(() => {
        if (status == 'guest') router.push('/')
    }, [status, router])


    const pagesJson = pages.map(p => {
        const iscnId = p.data['@id'] as string
        return {
            key: iscnId,
            link: `/page?pageId=${encodeURIComponent(iscnId)}`,
            description: p?.data?.contentMetadata?.description,
            recordTime: p?.data?.recordTimestamp,
        }
    })

    return (
        <LoginedLayout navbarAction={<LogoutBtn></LogoutBtn>}>
            <div className="max-w-md mx-auto py-10 px-4">
                <div className="text-center flex items-center justify-between">
                    <Link href="/dashboard/create-page">
                        <a className="w-full block primary-btn mb-2">
                            Create Entry
                        </a>
                    </Link>
                    
                </div>
                {pagesJson.map((p) => 
                    <PageSummary 
                        key={p.key} 
                        link={p.link} description={p.description} recordTime={p.recordTime}
                    ></PageSummary>
                )}
            </div>
        </LoginedLayout>
    )
}

export default DashboardPages