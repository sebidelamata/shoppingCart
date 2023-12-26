import { useState } from 'react'
import Paperboat from '../../public/Paperboat.svg'
import Navbar from '../components/Navbar'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

function App() {

  // Wallet Connect Stuff
  // 1. Get projectId at https://cloud.walletconnect.com
  const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
  // 2. Create wagmiConfig
  const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
  
  const chains = [mainnet, arbitrum]
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
  // 3. Create modal
  createWeb3Modal({ wagmiConfig, projectId, chains })

  return (
    <WagmiConfig config={wagmiConfig}>
      <div>
        <Navbar />
        <div className='body'>
          <div>
            <img className='icon-large' src={Paperboat} alt="GapingPond Logo" />
          </div>
        </div>
      </div>
      <h1>GapingPond</h1>
      <div className="card">
        <div>A Custom Whitelabel NFT Marketplace</div>
        <div>bc sometimes its better to be a big fish in a small pond</div>
      </div>
    </WagmiConfig>
  )
}

export default App
