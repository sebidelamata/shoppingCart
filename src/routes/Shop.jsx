import Navbar from '../components/Navbar'
import { Link, Outlet } from 'react-router-dom'

function Shop() {

  return (
    <>
      <div>
        <Navbar />
      </div>
      <Link to={'/shop'}>
        <h1>Shop NFTs</h1>
      </Link>
      <div className="outlet-card">
        <Outlet />
      </div>
    </>
  )
}

export default Shop
