import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navcss from './css/Navbar.module.css'

import logo from './images/logo2.png'

function Navbar() {
  const UserToken = localStorage.getItem('UserToken');

  return (
    <>
    <div className={navcss.navbar}>
      <img className={navcss.logo} src={logo} alt="ds" />
        <div className={navcss.linksdiv}>
            <Link className={navcss.links} to="/"><p>Home</p></Link>
            <Link className={navcss.links} to="/explore"><p>Explore</p></Link>
            <Link className={navcss.links} to="/search"><p>Search</p></Link>
            <Link className={navcss.links} to="/create"><p>Create</p></Link>
            {/* <Link className={navcss.links} to="/myprofile"><p>My Profile</p></Link> */}
        </div>
        <div>
            {/* <Link className={navcss.loginsignup} to="/auth/login">Login</Link> */}
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