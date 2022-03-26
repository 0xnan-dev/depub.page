import Link from "next/link";
import { FC, } from "react";
import { DateTime } from 'luxon'
import Dropdown from "../Common/Dropdown";


const PageSummary: FC<{
    link: string,
    description: string,
    recordTime: any,
}> = ({ link, description, recordTime, }) => {
    const displayRecordTime = DateTime.fromISO(recordTime).toLocaleString()

    return (
        <Link  href={link}>
            <div className="mx-auto mb-3 block p-6 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-right text-gray-500">{displayRecordTime}</p>
                    <Dropdown>
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                            <li>
                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Edit
                                </a>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
                <p className="mb-2"> {description} </p>
            </div> 
        </Link>
    )
}
export default PageSummary