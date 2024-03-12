import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Searchcss from './Search.module.css'

function Search() {
  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      <div>
        <h1>Search</h1>
        <input type="text" />
      </div>
      <Footer />
    </>
  )
}

export default Search