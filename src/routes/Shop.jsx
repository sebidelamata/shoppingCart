import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
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
