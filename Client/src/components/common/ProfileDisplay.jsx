import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import pcss from './css/Profile.module.css'
import axios from 'axios'

function ProfileDisplay() {
  const [existingUsernames, setExistingUsernames] = useState([])
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

  return (
    <div className={pcss.flex}>
      <div className={pcss.profile}>
        {user ? (
          <div>
            <p>Account Name: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </div>
  )
}

export default ProfileDisplay