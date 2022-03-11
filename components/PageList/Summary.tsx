import Link from "next/link";
import { FC } from "react";

const PageSummary: FC<{
    link: string,
    description: string,
}> = ({ link, description, }) => {
    return (
        <Link  href={link}>
            <a className="mx-auto mb-3 block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                {description}
            </a> 
        </Link>
    )
}

export default PageSummary