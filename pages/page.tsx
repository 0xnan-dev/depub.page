import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Page = () => {
    const router = useRouter();
    const pageId = router.query.pageId
    console.log(pageId)
    return (
        <Layout>

        </Layout>
    )

}

export default Page