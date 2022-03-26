import dynamic from 'next/dynamic'
import { FC } from 'react'

const QuillNoSSRWrapper = dynamic(
    () => import('./QuillEditor'),
    { ssr: false, loading: () => <p>Loading ...</p> },
)

const QuillEditor: FC<{
    value?: string,
    onChange: (val: string) => void,
    disabled?: boolean,
}> = ({ value, onChange, disabled, }) => {
    return (
        <QuillNoSSRWrapper value={value} disabled={disabled} onChange={onChange}></QuillNoSSRWrapper>
    )
}

export default QuillEditor