import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Register from "./component/register"
const App=()=>{
  return(
    <div>
      <nav>
       | 
        <Link to="/register">Register</Link> | 
        
      </nav>

      <Routes>
        
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </div>
  )
}



export default App
