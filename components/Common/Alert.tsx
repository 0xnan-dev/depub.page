import { FC, useEffect, useState } from "react";
import { ALERT_TYPE } from "../../hooks/useAlert.hook";

const Alert: FC<{
    className?: string,
    type?: ALERT_TYPE,
    onClose: () => void,
    withTransition?: boolean,
}> = ({ children, className, type, onClose, withTransition = true, }) => {
    const [transition, setTransition] = useState(
        withTransition? 'transition ease-in-out -translate-y-full opacity-0': ''
    )
    function getTheme() {
        switch (type) {
            case ALERT_TYPE.ERROR:
                return 'red'
            default:
                return 'purple'
        }
    }

    const theme = getTheme()

    useEffect(() => {
        setTimeout(() => {
            setTransition('transition ease-in-out translate-y-0 opacity-100')
        }, 0);
    }, [])

    return (
        <div
            className={`p-4 mb-4 text-sm rounded-lg text-${theme}-700 bg-${theme}-100 ${className || ''} ${transition}`} 
            role="alert"
        >
            <div className="flex items-center justufy-between">
                {children}
                <button 
                    type="button"
                    className={`ml-auto -mx-1.5 -my-1.5 rounded-lg bg-${theme}-100 text-${theme}-500  p-1.5 inline-flex h-8 w-8`}
                    aria-label="Close"
                    onClick={() => onClose()}
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}


export default Alert