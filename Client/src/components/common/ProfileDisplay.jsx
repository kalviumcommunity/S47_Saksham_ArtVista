import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import pcss from './css/Profile.module.css'
import axios from 'axios'
import defaultpic from '../Authentication/imgs/defaultpic.jpg'

function ProfileDisplay() {
  const [existingUsernames, setExistingUsernames] = useState([])
  const [pics, setPics] = useState()
  const {username} = useParams();

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/getpostuser`);
        setExistingUsernames(response.data.users); 
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    fetchUsernames();
  }, [])
  const user = existingUsernames.find(user => user.username === username);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/getallimg`,
          { username },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer' 
          }
        );
        const blob = new Blob([response.data], { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);
        setPics(blobUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
  
    fetchProfileImage();
  }, [username]);
  

  return (
    <div className={pcss.flex}>
      <div className={pcss.profile}>
        {user ? (
          <div className={pcss.flex}>
            <img className={pcss.imgpic} src={pics} alt="" />
            <p>{user.username}</p>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </div>
  )
}

export default ProfileDisplay