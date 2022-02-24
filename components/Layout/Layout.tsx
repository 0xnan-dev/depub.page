import { FC } from "react";
import Head from 'next/head'

import Navbar from './Navbar'

const Layout: FC = ({ children, }) => (
    <div>
        <Head>
            <title>depub.Page</title>
            <meta name="description" content="depub.Page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>


        <div>
            <Navbar></Navbar>
            <main className="height-f">
                { children }
            </main>
        </div>

    </div>
)

export default Layout