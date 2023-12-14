import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div>NavBar</div>
        <Link to={'/'} className='navbar-link'>Home</Link>
        <Link to={'/shop'} className='navbar-link'>Shop</Link>
        <Link to={'/checkout'} className='navbar-link'>Checkout</Link>
    </div>
  )
}

export default Navbar
