import { useState } from 'react'
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
