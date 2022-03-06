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


const LoginedNavbar: FC = ({ children }) => {
    return (
            <nav className="fixed z-50 h-16 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <div className="container mx-auto flex items-center ">
                    <UserProfile></UserProfile>

                    {children}

                </div>
            </nav>
    )
}

export {
    Navbar,
    LoginedNavbar,
}

