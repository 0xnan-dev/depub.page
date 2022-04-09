import { FC, MouseEvent, useEffect, useRef, useState } from "react";

const Dropdown: FC<{
}> = ({
    children,
}) => {
    const [show, setShow] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    const dropdownClass = show? 'absolute top-full right-0': 'hidden'

    function onClick(e: MouseEvent) {
        setShow(true)
        e.preventDefault()
    }

    const onClickoutside: EventListenerOrEventListenerObject = function (e: Event) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setShow(false)
        }
    }

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', onClickoutside)
        }
        return () => {
            document.removeEventListener("mousedown", onClickoutside)
        }

    }, [show])

    return (
        <div className="relative" ref={ref}>
            <button type="button" onClick={onClick} >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            <div className={`${dropdownClass} z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow`}>
                {children}
            </div>
        </div>
    )
}

export default Dropdown