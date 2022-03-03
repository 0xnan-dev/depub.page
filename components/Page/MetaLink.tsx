import { ComponentProps, FC } from 'react';


const MetaLink: FC<{
    link?: string;
    label: string;
    value: string;
}> = ({ link, label, value }) => {
    return (
        <div className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            <a href={link} target="_blank" rel="noreferrer" >
                <div className="text-gray-500 flex items-center justify-between">
                    <span>{label}</span>
                    <span className="max-w-xs inline-block truncate">{value}</span>
                </div>
            </a>
        </div>
    )
}


export type MetaLinkProps = ComponentProps<typeof MetaLink>

const MetaLinks: FC<{
    links: MetaLinkProps[]
}> = ({ links }) => {
    const metaLinks = links.map((l, i) => {
        return <MetaLink key={i} link={l.link} label={l.label} value={l.value}></MetaLink>
    })

    return (
        <div className="mt-14 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            { metaLinks }
        </div>
    )
}

export type MetaLinksProps = ComponentProps<typeof MetaLinks>

export default MetaLinks