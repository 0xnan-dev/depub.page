import { FC } from "react";

import Navbar from './Navbar'

const Layout: FC = ({ children, }) => (
    <div>
        <Navbar></Navbar>
        <main>
            { children }
        </main>
    </div>
)

export default Layout