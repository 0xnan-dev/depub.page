import Button from "./Common/Button";


interface ConnectWalletProps {
  onPressWalletConnect?: () => void;
  onPressKeplr?: () => void;
  isLoading?: boolean;
}

const ConnectWallet = (props: ConnectWalletProps) => {
    return (
        <div>
            <Button
                className="primary-btn"
                isLoading={props.isLoading}
                onClick={props.onPressKeplr}
                >
                Connect Wallet
            </Button>
            {/* <button type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={props.onPressKeplr}>
            </button> */}
        </div>
    )
}

export default ConnectWallet