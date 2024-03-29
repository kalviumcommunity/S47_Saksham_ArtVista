import React from 'react'
import { Link } from 'react-router-dom'
import navcss from './css/Navbar.module.css'
function Navbar() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

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
            {/* <Link className={navcss.loginsignup} to="/auth/login">Login</Link> */}
            {loggedInUser ? (
            <Link className={navcss.loginsignup} to="/auth/editauth">Profile</Link>
            ) : (
            <Link className={navcss.loginsignup} to="/auth/login">Login</Link>
            )}
        </div>
    </div>
    </>
  )
}

export default Navbar;