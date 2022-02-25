import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useSigningCosmWasmClient } from '../hooks';
import ConnectWallet  from '../components/ConnectWallet';
import { useEffect } from 'react';
import Link from 'next/link';

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

  const DashBoardBtn = () => (
    <Link href="/dashboard"> 
      <a className="primary-bordered-btn">Dashboard</a>
    </Link>
  )

  return (
    <Layout>
      <div className="container mx-auto py-24">
        <div className="text-center">
          {
            walletAddress
              ?  <DashBoardBtn></DashBoardBtn>
              : <ConnectWallet isLoading={isConnectLoading} onPressKeplr={connectKeplr}/>
          }
        </div>
      </div>
    </Layout>
  )
}

export default Home
