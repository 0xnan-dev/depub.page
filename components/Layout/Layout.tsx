import { FC, MouseEventHandler, ReactElement } from "react";
import Head from 'next/head'

import { Navbar, LoginedNavbar } from './Navbar'

const Layout: FC = ({ children, }) => (
    <div>
        <Head>
            <title>depub.Page</title>
            <meta name="description" content="depub.Page" />
            <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
            <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
            <link rel="icon" href="/favicon.ico" />
        </Head>


        <div className="min-h-screen flex relative">
            <Navbar></Navbar>
            <main className="grow pt-16">
                { children }
            </main>
        </div>

    </div>
)

const LoginedLayout: FC<{
    navbarAction?: ReactElement,
    onBack?: MouseEventHandler,
}> = ({ children, navbarAction, onBack }) => {
    return (
        <div>
            <Head>
                <title>depub.Page</title>
                <meta name="description" content="depub.Page" />
                <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
                <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className="min-h-screen flex relative">
                <LoginedNavbar onBack={onBack}>{navbarAction}</LoginedNavbar>
                <main className="grow pt-16">
                    { children }
                </main>
            </div>

        </div>
    )
}


export {
    Layout,
    LoginedLayout
}