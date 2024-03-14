import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Createcss from './Create.module.css'

function Create() {
  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      <div className={`${Createcss.container}`}>
          
        <form className={`${Createcss.formconts}`} action="">
            <div>
              <p  htmlFor="title">Title: </p>
              <input
              type='text' 
              placeholder='test'
              onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <p htmlFor="image">File upload</p>
              <input
              type='file'
              name='file' 
              placeholder='******'
              onChange={(e) => setFile(e.target.value)}
              />
            </div>

            <div>
              <p  htmlFor="description">Description: </p>
              <input
              type='text' 
              placeholder='test'
              onChange={(e) => setDescription(e.target.value)}
              />
            </div>
        </form>

        <div className={`${Createcss.pastcreatedposts}    `}>

        </div>
        
      </div>
      <Footer />
    </>
  )
}

export default Create;