import Navbar from "../components/Navbar.jsx"
import Loading from "../components/Loading.jsx"

const Docs = () => {
    return (
        <div className="docs-page">
            <Navbar></Navbar>
            <Loading/>
            <div>Docs</div>
        </div>
    )
}

export default Docs