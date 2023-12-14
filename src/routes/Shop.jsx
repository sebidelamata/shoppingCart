import { useState } from 'react'
import Navbar from '../components/Navbar'

function Shop() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Shop NFTs</h1>
      <div className="card">
        shopping stuff goes here
      </div>
    </>
  )
}

export default Shop
