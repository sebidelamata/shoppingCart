import { useState } from 'react'
import Navbar from '../components/Navbar'
import AllCollections from '../components/AllCollections'

function Shop() {
  const [view, setView] = useState('allCollections')

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Shop NFTs</h1>
      <div className="all-collections-card">
        <AllCollections />
      </div>
    </>
  )
}

export default Shop
