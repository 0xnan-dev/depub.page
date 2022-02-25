import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useSigningCosmWasmClient } from '../hooks';
import ConnectWallet  from '../components/ConnectWallet';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const {
    error: connectError,
    isLoading: isConnectLoading,
    connectKeplr,
    connectWalletConnect,
    walletAddress,
    offlineSigner,
  } = useSigningCosmWasmClient()

  useEffect(() => {
    if (connectError) alert(connectError)
  }, [connectError])

  useEffect(() => {
    if (walletAddress) console.log(walletAddress)
  }, [walletAddress])

  return (
    <Layout>
      <div className="container mx-auto py-24">
        <div className="text-center">
          <ConnectWallet
            isLoading={isConnectLoading}
            onPressKeplr={connectKeplr}
          ></ConnectWallet>
        </div>
      </div>
    </Layout>
  )
}

export default Home
