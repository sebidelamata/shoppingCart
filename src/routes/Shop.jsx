import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Shop() {
  const [view, setView] = useState('allCollections')

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Shop NFTs</h1>
      <div className="outlet-card">
        <Outlet />
      </div>
    </>
  )
}

export default Shop
