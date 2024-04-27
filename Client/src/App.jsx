import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// All Pages Routes here
import Home from './components/pages/Home'
import Create from './components/pages/Create'
import Explore from './components/pages/Explore'
import Modify from './components/pages/Modify'
import Search from './components/pages/Search'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Editauth from './components/Authentication/Editauth'
import OtherEdit from './components/pages/OtherEdit'
import SetUser from './components/Authentication/components/SetUser'
import SetImage from './components/Authentication/components/SetImage'
import PostDisplay from './components/pages/components/PostDisplay'
// import MyProfile from './components/pages/MyProfile'


function App() {
  return (
    <div className='MainAppDarkMode'>
    <BrowserRouter>
        <Routes>

          {/* Navbar Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />

          {/* Authentication routes */}
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/editauth' element={<Editauth />} />

          {/* Feature Routes */}
          <Route path="/display/:postId" element={<PostDisplay />} />
          <Route path="/modify/:postId" element={<Modify />} />
          <Route path='/other/:username' element={<OtherEdit/>}/>
          {/* <Route path="/myprofile" element={<MyProfile />} /> */}
          <Route path='/auth/config/setuser' element={<SetUser />} />
          <Route path='/auth/config/setimage' element={<SetImage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
