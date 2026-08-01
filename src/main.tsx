import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <App />
       <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
    />
    </BrowserRouter>
   
  </StrictMode>,
)
