import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useShoppingCart } from '../scripts/ShoppingCartContext.jsx'

function Checkout() {

  const { shoppingCart, addToCart } = useShoppingCart()

  console.log(shoppingCart)

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
