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
        <div>
          { shoppingCart.map((item) => {
            return(
              <li key={item[0].order_hash}>
                {item[0].order_hash}
              </li>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Checkout
