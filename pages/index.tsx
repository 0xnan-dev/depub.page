import type { NextPage } from 'next'
import Head from 'next/head'
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

  return (
    <div>
      <Head>
        <title>depub.Page</title>
        <meta name="description" content="depub.Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="container mx-auto py-2">
          <div className="text-center">
            <ConnectWallet
              onPressKeplr={connectKeplr}
            ></ConnectWallet>
          </div>
        </div>

      </Layout>


    </div>
  )
}

export default Home
