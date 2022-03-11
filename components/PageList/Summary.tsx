import Link from "next/link";
import { FC } from "react";
import { DateTime } from 'luxon'


const PageSummary: FC<{
    link: string,
    description: string,
    recordTime: any,
}> = ({ link, description, recordTime, }) => {
    console.log(typeof recordTime)
    const displayRecordTime = DateTime.fromISO(recordTime).toLocaleString()
    return (
        <Link  href={link}>
            <a className="mx-auto mb-3 block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <p className="mb-2"> {description} </p>
                <p className="text-xs text-right text-gray-500">{displayRecordTime}</p>
            </a> 
        </Link>
    )
}
export default PageSummary