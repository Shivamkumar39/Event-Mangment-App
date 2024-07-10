import React from 'react'
import Navbars from './pages/Navbar'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'


const App = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    

    </BrowserRouter >
  )
}

export default App
