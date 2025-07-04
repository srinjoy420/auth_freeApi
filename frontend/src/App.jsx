import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/register"
import Login from './pages/login';
import About from './pages/about';
import EmailVerification from './pages/EmailVerification';
const App=()=>{
  return(
    <div>
      <nav>
       
        
        
      </nav>

      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<About />} />
       <Route path="/verify-email/:token" element={<EmailVerification />} />

       
      </Routes>
    </div>
  )
}



export default App
