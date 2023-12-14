import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from '../components/Navbar'

function Checkout() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Checkout</h1>
      <div className="card">
        Checkout stuff goes here
      </div>
    </>
  )
}

export default Checkout
