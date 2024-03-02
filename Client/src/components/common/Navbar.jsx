import React from 'react'
import { Link } from 'react-router-dom'
import navcss from './Navbar.module.css'
function Navbar() {
  return (
    <>
    <div className={navcss.navbar}>
        <img src="" alt="lol" />
        <div className="">
            <Link className={navcss.links} to="/">Home</Link>
            <Link className={navcss.links} to="/search">Search</Link>
            <Link className={navcss.links} to="/create">Create</Link>
        </div>
        <div className={navcss.loginsignupdiv}>
            <Link className={navcss.loginsignup} to="/user">Login/Signup</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar;