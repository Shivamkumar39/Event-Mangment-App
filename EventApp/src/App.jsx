import React from 'react'
import Navbars from './pages/Navbar'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import EventBooked from './components/EventBooked'


const App = () => {
  return (
    <BrowserRouter>
    <div className='h-screen'>
      
      <div className='h-[15%]'>
        <Navbars />

      </div>
      <div className='h-[85%]'>

        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/UserBookedEvent' element={<EventBooked/>} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/userprofile' element={<ProfilePage />} />
        </Routes>
      </div>

    </div>

    </BrowserRouter >
  )
}

export default App
