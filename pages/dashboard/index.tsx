import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout"
import { useAppState, useSigningCosmWasmClient } from "../../hooks"
import { ISCNRecord } from "@likecoin/iscn-js"
import Button from "../../components/Common/Button"
import { useRouter } from "next/router"


const DashboardPages = (props: any) => {
    const {
        walletAddress,
        status,
        disconnect,
    } = useSigningCosmWasmClient()
    const {
        fetchMessagesByOwner,
    } = useAppState()
    const [ pages, setPages ] = useState<ISCNRecord[]>([])
    const router = useRouter()

    async function fetchPages(address: string) {
        let results = await fetchMessagesByOwner(address)
        if (results) setPages(results)
    }
    async function logout() {
        await disconnect()
        router.push('/')
    }

    useEffect(() => {
        if (walletAddress) fetchPages(walletAddress)
    }, [walletAddress])

    useEffect(() => {
        if (status == 'guest') router.push('/')
    }, [status, router])


    const PageList = pages.map(p => {
        const iscnId = p.data['@id'] as string
        if (!iscnId) return ''

        return (
            <Link key={iscnId} href={`/page?pageId=${encodeURIComponent(iscnId)}`}>
                <a className="mx-auto block p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-70">
                    {p.data.contentMetadata.description}
                </a> 
            </Link>
        )
    })

    return (
        <Layout>
            <div className="max-w-md mx-auto py-24 ">
                <div className="text-center flex items-center justify-between">
                    <Link href="/dashboard/create-page">
                        <a className="w-64 block primary-btn">
                            Create Entry
                        </a>
                    </Link>
                    <Button className="white-btn" onClick={logout}>Logout</Button>
                </div>
                {PageList}
            </div>
        </Layout>
    )
}

export default DashboardPages