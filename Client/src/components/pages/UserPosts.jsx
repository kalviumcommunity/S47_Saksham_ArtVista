import React, { useState, useEffect } from 'react'
import axios from 'axios'
import homecss from './css/Home.module.css'
import { useNavigate } from 'react-router-dom';

//loader 
import Loader from '../common/components/loader'
const OtherEdit = () => {

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        setUserId(userData.email);
        }
    }, []);
    // console.log(userId)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/posts/home`);
            setPosts(response.data);
            setLoader(false);
            // console.log(response.data)
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoader(false);
          }
        };
    
        fetchData();
      }, []);

    const UserToken = localStorage.getItem('UserToken');
    if (!UserToken) {
      console.error('Token not found');
      return;
    }
    const handleDelete = async (postId) => {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/modify/${postId}`, {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        });
        setMessage(response);
        console.log(response);
      } catch (error) {
        setMessage(error || 'An error occurred');
        console.error('Error deleting post:', error);
        
      }
    }

      const handleEdit = (editPostId) => {
        navigate(`/modify/${editPostId}`);
      }
      

  return (
    <>
        <br /><br /><br /><br /><br /><br />
        <div className={homecss.container}>
        {
            loader ? (
              <Loader/>
            ) : (
              <div className={homecss.postscont}>
            {
                posts
                    .filter((post) => post.email == userId)
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
                            <div>
                                <div>
                                <button onClick={() => handleEdit(post._id)}>Edit</button>
                                <button onClick={() => handleDelete(post._id)}>Delete</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        )
                    })
            }
        </div>
            )
        }
        </div>
    </>
  )
}

export default OtherEdit;