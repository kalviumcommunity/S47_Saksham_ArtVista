import React from 'react'
import { Link } from 'react-router-dom'
import navcss from './css/Navbar.module.css'
import Redirect from './Redirect'
function Navbar() {
  return (
    <>
    <div className={navcss.navbar}>
        <img src="" alt="lol" />
        <div className={navcss.linksdiv}>
            <Link className={navcss.links} to="/"><p>Home</p></Link>
            <Link className={navcss.links} to="/search"><p>Search</p></Link>
            <Link className={navcss.links} to="/create"><p>Create</p></Link>
            {/* <Link className={navcss.links} to="/myprofile"><p>My Profile</p></Link> */}
        </div>
        <div className={navcss.loginsignupdiv}>
            {/* <Redirect /> */}
            <Link className={navcss.loginsignup} to="/auth/login">Login</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar;