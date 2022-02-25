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
        </div>
    )
}

export default ConnectWallet