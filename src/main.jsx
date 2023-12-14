import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CustomRouter from './routes/Router.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomRouter />
  </React.StrictMode>,
)

