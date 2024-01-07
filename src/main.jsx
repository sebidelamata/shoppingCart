import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CustomRouter from './routes/Router.jsx'
import { ShoppingCartProvider } from './scripts/ShoppingCartContext.jsx'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'GapingPond',
  description: 'A Whiltelable NFT Marketplace',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <CustomRouter />
    </ShoppingCartProvider>
  </React.StrictMode>,
)

