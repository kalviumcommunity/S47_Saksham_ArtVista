import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import lcss from '../css/EditAuth.module.css';
import defaultpic from '../imgs/defaultpic.jpg';

const ImageUploadForm = () => {
    const [pic, setPic] = useState();
    const UserToken = localStorage.getItem('UserToken');
    const navigate = useNavigate();
    const [blobUrl, setBlobUrl] = useState();

    if (!UserToken) {
        navigate('/auth/login');
    }

    useEffect(() => {
      const UserToken = localStorage.getItem('UserToken');
      axios.get(`${import.meta.env.VITE_BACKEND}/getimg`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserToken}` 
        },
        responseType: 'blob'
      })
      .then(response => {
        const blobUrl = URL.createObjectURL(response.data); 
        setBlobUrl(blobUrl);
        // console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        setBlobUrl(defaultpic);
      });
    }, []);

    useEffect(() => {
        if (pic) {
            const imageUrl = URL.createObjectURL(pic);
            setPreviewUrl(imageUrl);
        }
    }, [pic]);

    return (
        <>
        <img className={lcss.profilepic} src={blobUrl? blobUrl : defaultpic} alt={"Profile "} />
        </>
    );
};

export default ImageUploadForm;
