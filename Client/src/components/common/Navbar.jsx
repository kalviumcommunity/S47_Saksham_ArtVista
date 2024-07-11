import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navcss from './css/Navbar.module.css'
import Cookies from 'js-cookie'
import logo from './images/logo2.png'

function Navbar() {
  const UserToken = Cookies.get('auth');

  return (
    <>
    <div className={navcss.navbar}>
      <img className={navcss.logo} src={logo} alt="ds" />
        <div className={navcss.linksdiv}>
            <Link className={navcss.links} to="/"><p>Home</p></Link>
            <Link className={navcss.links} to="/explore"><p>Explore</p></Link>
            <Link className={navcss.links} to="/search"><p>Search</p></Link>
            <Link className={navcss.links} to="/ai/generate"><p>Chat</p></Link>
            <Link className={navcss.links} to="/create"><p>Create</p></Link>
        </div>
        <div>
            {UserToken ? (
            <Link className={navcss.Backbtn} to="/auth/editauth">Profile</Link>
            ) : (
            <Link className={navcss.Backbtn} to="/auth/login">Login</Link>
            )}
        </div>
    </div>
    </>
  )
}

export default Navbar;