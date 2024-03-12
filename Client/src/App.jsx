import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Create from './components/pages/Create'
import Search from './components/pages/Search'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />

          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
