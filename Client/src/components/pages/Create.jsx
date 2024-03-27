import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Createcss from './Create.module.css'

function Create() {
  return (
    <>
      <Navbar />
      <div>
        <br /><br /><br /><br /><br />
        <h1>Create area</h1>
          
        <form action="">
            <div>
              <label  htmlFor="title">Title: </label>
              <input
              type='text' 
              placeholder='test'
              onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="image">File upload</label>
              <input
              type='file'
              name='file' 
              placeholder='******'
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label  htmlFor="description">Description: </label>
              <input
              type='text' 
              placeholder='test'
              onChange={(e) => setDescription(e.target.value)}
              />
            </div>
        </form>
        
      </div>
      <Footer />
    </>
  )
}

export default Create;