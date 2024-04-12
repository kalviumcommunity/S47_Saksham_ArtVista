import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../common/Navbar'
import axios from 'axios'
import homecss from './css/Home.module.css'
import ProfileDisplay from '../common/ProfileDisplay'

const OtherEdit = () => {

    const [posts, setPosts] = useState([]);
    const { username } = useParams();
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    // fetching all usernames from backend
    useEffect(() => {
      const fetchUsernames = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getpostuser`);
          setExistingUsernames(response.data.users); 
          // console.log(response.data.users)
        } catch (error) {
          console.error('Error fetching usernames:', error);
        }
      };
      fetchUsernames();
    }, [])

    // getting email assoiated t the username in my url
    useEffect(() => {
      const user = existingUsernames.find(user => user.username === username);
      if (user) {
          setUserEmail(user.email);
          // console.log(user.email);
      } else {
          setUserEmail('Email not found');
      }
    }, [existingUsernames, username]);

    // getting all posts by the user
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(import.meta.env.VITE_HOMEAPI);
            setPosts(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      

  return (
    <>
        <Navbar/>
        <br /><br /><br /><br /><br /><br />
        <ProfileDisplay/>
        <div className={homecss.container}>
        <div className={homecss.postscont}>
        {
            posts
                .filter((post) => post.email == userEmail)
                .map((post,index)=>{
                    return(
                        <div className={homecss.postinv} key={post._id}>
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
                        <button>
                            <h4>by:{username}</h4>  
                        </button>
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

export default OtherEdit