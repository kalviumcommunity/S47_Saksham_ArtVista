import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//              all links here
import Home from './components/pages/Home'
import Create from './components/pages/Create'
import Modify from './components/pages/Modify'
import Search from './components/pages/Search'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Editauth from './components/Authentication/Editauth'
import OtherEdit from './components/pages/OtherEdit'
import SetUser from './components/Authentication/components/SetUser'
// import MyProfile from './components/pages/MyProfile'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/modify" element={<Modify />} />
          <Route path="/search" element={<Search />} />
          <Route path='/other/:id' element={<OtherEdit/>}/>
          {/* <Route path="/myprofile" element={<MyProfile />} /> */}
          
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/editauth' element={<Editauth />} />
          <Route path='/auth/config/setuser' element={<SetUser />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
