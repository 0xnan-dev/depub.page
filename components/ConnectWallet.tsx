

interface ConnectWalletProps {
  onPressWalletConnect?: () => void;
  onPressKeplr?: () => void;
  isLoading?: boolean;
}

const ConnectWallet = (props: ConnectWalletProps) => {
    return (
        <div>
            <button type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={props.onPressKeplr}>
                Connect Wallet
            </button>
        </div>
    )
}

export default ConnectWallet