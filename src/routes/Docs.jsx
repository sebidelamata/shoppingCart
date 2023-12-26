import Navbar from "../components/Navbar.jsx"
import Loading from "../components/Loading.jsx"
import WalletConnectButton from "../components/WalletConnectButton.jsx"

const Docs = () => {
    return (
        <div className="docs-page">
            <Navbar/>
            <Loading/>
            <div>Docs</div>
        </div>
    )
}

export default Docs