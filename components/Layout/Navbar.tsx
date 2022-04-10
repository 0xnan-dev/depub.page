import Link from "next/link";
import { FC, MouseEventHandler } from "react";
import UserProfile from '../User/Profile'

const Navbar: FC = () => {
    return (
            <nav className="fixed z-40 h-16 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
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
    onBack:  MouseEventHandler
}> = ({ onBack }) => {
    return (
        <a className="white-btn py-2.5" onClick={onBack}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
        </a>
    )
}


const LoginedNavbar: FC<{
    onBack?: MouseEventHandler,
}> = ({ children, onBack, }) => {
    return (
            <nav className="fixed z-40 h-16 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <div className="container mx-auto flex items-center ">
                    <div className="grow">
                        <UserProfile></UserProfile>
                    </div>
                    {onBack? <BackBtn onBack={onBack}></BackBtn>: ''}
                    {children}
                </div>
            </nav>
    )
}

export {
    Navbar,
    LoginedNavbar,
}

