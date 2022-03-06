import Link from "next/link";
import { FC } from "react";
import UserProfile from '../User/Profile'

const Navbar: FC = () => {
    return (
            <nav className="fixed z-50 h-16 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <div className="container mx-auto flex items-center justify-center">
                    <Link href="/">
                        <a>
                            <img src="/app-logo.svg" alt="depub.Page" width="220" height="45"/>
                        </a>
                    </Link>
                </div>
            </nav>
    )
}

const BackBtn: FC<{
    backUrl: string
}> = ({ backUrl }) => {
    return (
        <Link href={backUrl}>
            <a className="white-btn py-2.5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </a>
        </Link>
    )
}


const LoginedNavbar: FC<{
    backUrl?: string,
}> = ({ children, backUrl, }) => {
    return (
            <nav className="fixed z-50 h-16 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <div className="container mx-auto flex items-center ">
                    <div className="grow">
                        <UserProfile></UserProfile>
                    </div>
                    {backUrl? <BackBtn backUrl={backUrl}></BackBtn>: ''}
                    {children}
                </div>
            </nav>
    )
}

export {
    Navbar,
    LoginedNavbar,
}

