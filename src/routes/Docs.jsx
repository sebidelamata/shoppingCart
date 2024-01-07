import Navbar from "../components/Navbar.jsx"
import Loading from "../components/Loading.jsx"
import WalletConnectButton from "../components/WalletConnectButton.jsx"

const Docs = () => {
    return (
        <div className="docs-page">
            <Navbar/>
            <div className="docs">
                <div className="docs-body">
                    <h1>GapingPond</h1>
                    <div className="docs-content">
                    GapingPond is a whitelabel NFT Marketplace Service that sits (floats) on top of OpenSea. GapingPond is a white glove analytics service. GapingPond uses <a href="https://defillama.com/nfts" target="_blank" rel="noreferrer"><strong>DeFiLlamma</strong></a> and <a href="https://opensea.io/" target="_blank" rel="noreferrer"><strong>OpenSea</strong></a> APIs to filter NFTs to the top 1000 by volume on Ethereum network. GapingPond provides analytics and metrics currently unavailable on OpenSea alone, as well as interactive charts. GapingPond is currently in beta release, meaning there may be some bugs during use. The application user assumes all risk financial or otherwise when using the application.
                    </div>
                </div>
                <div className="docs-footer">
                    <div className="author-avatar-container">
                        <img className="author-avatar" src="/GBC-3901.png" alt="GMX Blueberry Club #3901" />
                    </div>
                    <div className="docs-attribution">
                        Created by Sebi de la Mata (djniceboisweater.eth)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Docs