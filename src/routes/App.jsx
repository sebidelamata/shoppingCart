import { useState } from 'react'
import Paperboat from '/Paperboat.svg'
import Navbar from '../components/Navbar'

function App() {

  return (
      <div className='home-page'>
        <Navbar />
        <div className='body'>
          <div className='logo-large-container'>
            <img className='icon-large' src={Paperboat} alt="GapingPond Logo" />
          </div>
          <h1>GapingPond</h1>
          <div className="card">
            <div>A Custom Whitelabel NFT Marketplace</div>
            <div>bc sometimes its better to be a big fish in a small pond</div>
          </div>
        </div>
      </div>
  )
}

export default App
