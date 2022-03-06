import { useSigningCosmWasmClient } from "../../hooks";


const UserProfile = (props: any) => {
    const {
        walletAddress,
        status,
        disconnect,
    } = useSigningCosmWasmClient()
    const shortenAddress = walletAddress? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-4)}`: '';
    return (
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full shadow-sm bg-gray-200"></div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {shortenAddress}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                </p>
            </div>
        </div>
    )
}

export default UserProfile