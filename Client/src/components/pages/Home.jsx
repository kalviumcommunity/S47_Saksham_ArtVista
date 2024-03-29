import React from 'react'
import homecss from './css/Home.module.css'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import homedata from './sampleData/Home.json'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {

  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   setPosts(homedata.posts);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts/home');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar />
    <br /><br /><br /><br /><br />  
    <div className={homecss.container}>
    <div className={homecss.postscont}>

        {posts.map(post => (
          <div className={homecss.postinv} key={post.id}>

            <div className={homecss.postimagecont}>
              <img 
              src={post.image} 
              alt="post" 
              className={homecss.postimage}
              />
            </div>

            <div className={homecss.postdetails}>
              <p>{post.title}</p>
              <p>{post.description}</p>
            </div>
            
          </div>
        ))}

      </div>
    </div>
    <Footer />
    </>
  )
}

export default Home;