import { useState } from 'react'
import { Link } from 'react-router-dom'
import PaperBoat from '/Paperboat.svg'
import WalletConnectButton from './WalletConnectButton'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar-row-1'>
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
                    <Link to={'/checkout'} className='navbar-link'>
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </li>
                <li className='navbar-list-item'>
                    <Link to={'/docs'} className='navbar-link'>Docs</Link>
                </li>
            </ul>
        </div>
        <div className='navbar-row-2'>
            <w3m-button/>
        </div>
    </div>
  )
}

export default Navbar
