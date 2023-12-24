import Navbar from '../components/Navbar'
import { Link, Outlet } from 'react-router-dom'

function Shop() {

  return (
    <div className='shop-content'>
      <div>
        <Navbar />
      </div>
      <Link className='shop-header' to={'/shop'}>
        <h1>Shop NFTs</h1>
      </Link>
      <div className="outlet-card">
        <Outlet />
      </div>
    </div>
  )
}

export default Shop
