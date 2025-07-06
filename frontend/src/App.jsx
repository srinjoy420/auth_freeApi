import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/register"
import Login from './pages/login';
import About from './pages/about';
import EmailVerification from './pages/EmailVerification';

import Home from './pages/Home';
import PagenotFound from './pages/PagenotFound';
import { GoogleOAuthProvider  } from '@react-oauth/google'
// import Me from './pages/Me';


const App=()=>{
  const GOOGLE_CLIENT_ID="7688187129-jvpthsu14lpkjinrrhobc8grhpcr9cjt.apps.googleusercontent.com"
  
  return(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<About />} />
        {/* <Route path="/about" element={<Me />} /> */}
        <Route path="/verify-email/:token" element={<EmailVerification />} />
      
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}



export default App
