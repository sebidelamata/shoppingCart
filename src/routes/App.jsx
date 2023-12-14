import { useState } from 'react'
import Paperboat from '../../public/Paperboat.svg'
import Navbar from '../components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <div className='body'>
          <div>
            <img className='icon-large' src={Paperboat} alt="GapingPond Logo" />
          </div>
        </div>
      </div>
      <h1>GapingPond</h1>
      <div className="card">
        A Custom Whitelabel NFT Marketplace
      </div>
    </>
  )
}

export default App
