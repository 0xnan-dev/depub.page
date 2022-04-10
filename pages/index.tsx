import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { useSigningCosmWasmClient } from '../hooks';
import ConnectWallet  from '../components/ConnectWallet';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const {
    isLoading: isConnectLoading,
    connectKeplr,
    walletAddress,
  } = useSigningCosmWasmClient()
  const router = useRouter()

  async function connectWallet() {
    if (await connectKeplr()) router.push('/dashboard')
  }


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
              : <ConnectWallet isLoading={isConnectLoading} onPressKeplr={connectWallet}/>
          }
        </div>
      </div>
    </Layout>
  )
}

export default Home
