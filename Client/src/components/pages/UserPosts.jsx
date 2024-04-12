import React, { useState, useEffect } from 'react'
import axios from 'axios'
import homecss from './css/Home.module.css'
import { useNavigate } from 'react-router-dom';

const OtherEdit = () => {

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');
    const [editPostId, setEditPostId] = useState(null);
    const navigate = useNavigate();

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
            const response = await axios.get(import.meta.env.VITE_HOMEAPI);
            setPosts(response.data);
            // console.log(response.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleEdit = (editPostId) => {
        navigate(`/modify/${editPostId}`);
      }
      

  return (
    <>
        <br /><br /><br /><br /><br /><br />
        <div className={homecss.container}>
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