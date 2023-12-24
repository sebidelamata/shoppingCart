import { useState } from 'react'
import { Link } from 'react-router-dom'
import PaperBoat from '../../public/PaperBoat.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to={'/'} className='navbar-name-and-logo'>
            <div>
                <img src={PaperBoat} className='icon-small' alt="GapingPond Logo Small" />
            </div>
            <div>
                GapingPond
            </div>
        </Link>
        <ul className='navbar-list'>
            <li className='navbar-list-item'>
                <Link to={'/shop'} className='navbar-link'>Shop</Link>
            </li>
            <li className='navbar-list-item'>
                <Link to={'/checkout'} className='navbar-link'>Checkout</Link>
            </li>
            <li className='navbar-list-item'>
                <Link to={'/docs'} className='navbar-link'>Docs</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar
