import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CustomRouter from './routes/Router.jsx'
import { ShoppingCartProvider } from './scripts/ShoppingCartContext.jsx'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <ShoppingCartProvider>
        <CustomRouter />
      </ShoppingCartProvider>
    </WagmiConfig>
  </React.StrictMode>,
)

