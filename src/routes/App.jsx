import { useState } from 'react'
import Paperboat from '/Paperboat.svg'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function App() {

  return (
      <div className='home-page'>
        <Navbar />
        <div className='body'>
          <Link to={'/shop'} className='homepage-shop-link'>
            <button>Shop NFTs</button>
          </Link>
          <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <div className='home-content'>
            <div className='logo-large-container'>
              <img className='icon-large' src={Paperboat} alt="GapingPond Logo" />
            </div>
            <h1 className='home-content-title'>GapingPond</h1>
            <div className="home-content-card">
              <div>A Whitelabel NFT Marketplace</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
