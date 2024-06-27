import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../common/Navbar'
import axios from 'axios'
import homecss from './css/Otheredit.module.css'
import ProfileDisplay from '../common/ProfileDisplay'

//loader import 
import Loader from '../common/components/loader'

const OtherEdit = () => {

    const [posts, setPosts] = useState([]);
    const { username } = useParams();
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/posts/home`);
            setPosts(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);
      
      const reversedposts = [...posts].reverse();
  return (
    <>
        <Navbar/>
        <br /><br /><br /><br /><br /><br />
        {
          isLoading ? (
            <Loader />
          ) : (
            <div className={homecss.container}>
            <ProfileDisplay/>
            <div className={homecss.postscont}>
            {
                reversedposts
                    .filter((post) => post.email == userEmail)
                    .map((post,index)=>{
                        return(
                          <div onClick={() => navigate(`/display/${post._id}`)} style={{cursor: 'pointer'}} className={homecss.postinv} key={post._id}>
                            <div className={homecss.postimagecont}>
                                <img 
                                src={post.image} 
                                alt="post" 
                                className={homecss.postimage}
                                />
                            </div>
                            <div className={homecss.postdetails}>
                                <h3>{post.title}</h3>
                            </div>
                        </div>
                        )
                    })
            }
            </div>
            </div>
          )
        }
        <br /><br /><br />
    </>
  )
}

export default OtherEdit