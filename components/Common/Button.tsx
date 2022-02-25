import Loading from "./Loading"


const Button = (props: any) => {
    const type = props.type || 'button'
    return (
        <button
            type={type}
            disabled={props.isLoading}
            className={props.className}
            onClick={props.onClick}>
                {props.isLoading? <Loading/>: props.children}
        </button>
    )
}

export default Button