import { FC } from "react";
import Image from 'next/image'
import LogoPng from '../../public/app-logo.svg'

const Navbar: FC = () => (
    <div className="relative pb-16">
        <nav className="fixed z-50 t-0 w-full bg-white border-gray-100 border-b px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container mx-auto flex flex-wrap items-center justify-center">
                <Image src={LogoPng} alt="depub.Page" width="220" height="45"/>
            </div>
        </nav>
    </div>
)

export default Navbar

