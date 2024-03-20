import React, { useState, useEffect } from 'react'
import profilecss from './css/MyProfile.module.css'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import homedata from './sampleData/Home.json'
import homecss from './css/Home.module.css'

function MyProfile() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(homedata.posts);
  }, []);

  return (
    <>
    <Navbar />
    <br /><br /><br /><br /><br />  

    <h1>
      My Posts below
    </h1>
    <div className={homecss.container}>
    <div className={homecss.postscont}>
        {posts.map(post => (
          <div className={homecss.postinv} key={post.id}>
            <div className={homecss.postimagecont}>
              <img 
              src={post.image} 
              alt={post.title} 
              className={homecss.postimage}
              />
            </div>
            <div className={homecss.postdetails}>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Timestamp: {post.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default MyProfile