import { FC } from "react";
import Image from 'next/image'

const Navbar: FC = () => {
    return (
        <div className="relative pb-16">
            <nav className="fixed z-50 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <div className="container mx-auto flex items-center justify-center">
                    <Image src="/app-logo.svg" alt="depub.Page" width="220" height="45"/>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

