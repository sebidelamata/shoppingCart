import { useState } from 'react'
import Paperboat from '/Paperboat.svg'
import Navbar from '../components/Navbar'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

function App() {

  // Wallet Connect Stuff
  const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
  const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
  
  const chains = [mainnet, arbitrum]
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
  createWeb3Modal({ wagmiConfig, projectId, chains })

  return (
    <WagmiConfig config={wagmiConfig}>
      <div className='home-page'>
        <Navbar />
        <div className='body'>
          <div className='logo-large-container'>
            <img className='icon-large' src={Paperboat} alt="GapingPond Logo" />
          </div>
          <h1>GapingPond</h1>
          <div className="card">
            <div>A Custom Whitelabel NFT Marketplace</div>
            <div>bc sometimes its better to be a big fish in a small pond</div>
          </div>
        </div>
      </div>
    </WagmiConfig>
  )
}

export default App
