import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
    <div className="">
        <img src="" alt="lol" />
        <div className="">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/create">Create</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar;