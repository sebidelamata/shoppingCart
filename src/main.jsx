import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CustomRouter from './routes/Router.jsx'
import { ShoppingCartProvider } from './scripts/ShoppingCartContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <CustomRouter />
    </ShoppingCartProvider>
  </React.StrictMode>,
)

