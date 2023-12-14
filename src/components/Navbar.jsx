import { useState } from 'react'
import { Link } from 'react-router-dom'
import PaperBoat from '../../public/PaperBoat.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar-name-and-logo'>
            <div>
                <img src={PaperBoat} className='icon-small' alt="GapingPond Logo Small" />
            </div>
            <div>
                GapingPond
            </div>
        </div>
        <ul className='navbar-list'>
            <li className='navbar-list-item'>
                <Link to={'/'} className='navbar-link'>Home</Link>
            </li>
            <li className='navbar-list-item'>
                <Link to={'/shop'} className='navbar-link'>Shop</Link>
            </li>
            <li className='navbar-list-item'>
                <Link to={'/checkout'} className='navbar-link'>Checkout</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar
