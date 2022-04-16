import Link from "next/link";
import { FC, MouseEvent, } from "react";
import { DateTime } from 'luxon'
import Dropdown from "../Common/Dropdown";
import { useRouter } from "next/router";

const isDev = process.env.NODE_ENV !== 'production';

const PageSummary: FC<{
    pageId: string,
    description: string,
    recordTime: any,
    version?: number,
}> = ({ description, recordTime, pageId, version }) => {
    const displayRecordTime = DateTime.fromISO(recordTime).toLocaleString()
    const router = useRouter()

    function edit(e: MouseEvent) {
        router.push(`/dashboard/edit?pageId=${pageId}`)
        e.preventDefault()
    }

    return (
        <Link href={isDev? `/page?pageId=${pageId}`: `/page/${pageId}`} passHref>
            <div className="mx-auto mb-3 block p-6 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <p className="text-xs text-right text-gray-500">{displayRecordTime}</p>
                        <span className="bg-purple-300 text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                            v: {version}
                        </span>
                    </div>
                    <Dropdown>
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                            <li>
                                <span 
                                    onClick={edit}
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Edit
                                </span>
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