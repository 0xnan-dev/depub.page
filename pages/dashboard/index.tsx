import Link from "next/link"
import Layout from "../../components/Layout"


const DashboardPages = (props) => {
    return (
        <Layout>
            <div className="py-24">
                <div className="text-center">
                    <Link href="/dashboard/create-page">
                        <a className="primary-btn">
                            Create Entry
                        </a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default DashboardPages