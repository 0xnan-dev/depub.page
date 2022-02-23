import { FC } from "react";

import Navbar from './Navbar'

const Layout: FC = ({ children, }) => (
    <div>
        <Navbar></Navbar>
        <main className="height-f">
            { children }
        </main>
    </div>
)

export default Layout