import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// components import
import Navbar from '../../common/Navbar';
import css from './PostDisplay.module.css';
import Loader from '../../common/components/loader';

function PostDisplay() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [existingUsernames, setExistingUsernames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/modify/${postId}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          }); 
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostDetails();

    const fetchUsernames = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getpostuser`);
          setExistingUsernames(response.data.users); 
        } catch (error) {
          console.error('Error fetching usernames:', error);
        }
      };
      fetchUsernames();
  }, []);

  const handleUserVisit = (email) => {
    navigate(`/other/${email}`);
  };

  return (
    <>
    <Navbar />
    <br /><br /><br /><br /><br /><br />
    <div className={css.container}>
      {postData ? (
        <>
                <div className={css.post}>
            <img src={postData.image} alt="" />
            <div className={css.content}>
                <div className={css.details}>
                    <h2>{postData.title}</h2>
                    <p>{postData.description}</p>
                </div>
                <div className={css.authorback}>
                    <button onClick={() => handleUserVisit(existingUsernames.find(user => user.email === postData.email)?.username || postData.email)}>
                        <p>{existingUsernames.find(user => user.email === postData.email)?.username || "username"}</p>
                    </button>
                    <button className={css.backbtn} onClick={() => navigate(-1)}><p>Back</p></button>
                </div>
            </div>
        </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
    </>
  );
}

export default PostDisplay;
