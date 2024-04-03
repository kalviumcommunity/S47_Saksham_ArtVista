import React, { useState, useEffect } from 'react'
import axios from 'axios'
import homecss from './css/Home.module.css'

const OtherEdit = () => {

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        setUserId(userData.username);
        }
    }, []);
    // console.log(userId)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(import.meta.env.VITE_HOMEAPI);
            setPosts(response.data);
            // console.log(response)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      

  return (
    <>
        <br /><br /><br /><br /><br /><br />
        <div className={homecss.container}>
        <div className={homecss.postscont}>
        {
            posts
                .filter((post) => post.username == userId)
                .map((post,index)=>{
                    return(
                        <div className={homecss.postinv} key={post.id}>
                        <div className={homecss.postimagecont}>
                        <img 
                        src={post.image} 
                        alt="post" 
                        className={homecss.postimage}
                        />
                        </div>

                        <div className={homecss.postdetails}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <div>
                            {/* <button onClick={()=>handleUserVisit(post._id)}> */}
                                {/* <h4>by:{post.username}</h4>   */}
                            {/* </button> */}
                            <div>
                            <button>Edit</button>
                            <button>Delete</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                })
        }
        
        </div>
        </div>
    </>
  )
}

export default OtherEdit;