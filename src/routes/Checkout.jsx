import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useShoppingCart } from '../scripts/ShoppingCartContext.jsx'
import CheckoutListItem from '../components/CheckoutListItem.jsx'

function Checkout() {

  const { shoppingCart, addToCart, removeFromCart } = useShoppingCart()

  // may have multiple totals in multiple currencies
  const calculateCartTotals = (cart) => {
    if(cart.length === 0){
      return (
        [{currency: 'Ether', amount: '0'}]
      )
    }
    const currencyTotals = []
    cart.forEach((item) => {
      const currency = item[0].taker_asset_bundle.assets[0].name
      const amount = item[0].current_price / (10 ** item[0].taker_asset_bundle.assets[0].decimals)
      if (!currencyTotals[currency]) {
        currencyTotals[currency] = 0
      }
      currencyTotals[currency] += amount
    })
    const totalsArray = Object.entries(currencyTotals).map(([currency, amount]) => ({
      currency,
      amount
    }));
    return totalsArray;
  }

  const cartTotals = calculateCartTotals(shoppingCart)

  return (
    <div className='checkout'>
      <div>
        <Navbar />
      </div>
      <div className='checkout-body'>
        <h1>Checkout</h1>
        <div className="shopping-cart">
          <div className='shopping-cart-title-row'>
            <strong>Shopping Cart</strong>
          </div>
          <ul className='checkout-items-list'>
            { shoppingCart.map((item) => {
              return(
                <li key={item[0].order_hash}>
                  <CheckoutListItem item={item}/>
                </li>
              )
            })}
          </ul>
          <div className='cart-total-title-row'>
            <strong>Cart Total</strong>
          </div>
          <ul className='cart-totals-list'>
            {
              cartTotals.map((total) => {
                return(
                  <li key={total.currency} className='currency-total'>
                    {`${total.amount} ${total.currency}`}
                  </li>
                )
              })
            }
          </ul>
          <div className='pay-now-button-row'>
            <button className='pay-now-button'>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
