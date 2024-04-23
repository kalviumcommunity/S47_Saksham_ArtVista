import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import scss from './SetImage.module.css';
import defaultpic from '../imgs/defaultpic.jpg';

const SetImage = () => {
    const [pic, setPic] = useState();
    const UserToken = localStorage.getItem('UserToken');
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState();
    const [blobUrl, setBlobUrl] = useState();

    if (!UserToken) {
        navigate('/auth/login');
    }

    const upload = () => {
        const formData = new FormData();
        formData.append('profileImage', pic);

        axios.post(`${import.meta.env.VITE_BACKEND}/imgupload`, formData, {
            headers: {
                Authorization: `Bearer ${UserToken}`, 
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response);
            navigate('/auth/editauth');
        })
        .catch((error) => {
            // console.log(error.response.data);
        });
    };

    useEffect(() => {
        if (pic) {
            const imageUrl = URL.createObjectURL(pic);
            setPreviewUrl(imageUrl);
        }
    }, [pic]);


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
        // console.error('Error:', error);
        setBlobUrl(defaultpic);
      });
    }, []);

    return (
        <>
        <button className={scss.Backbtn} onClick={() => navigate(-1)}>{"< Back"}</button>
        <div className={scss.CompareCont}>
            <img  src={blobUrl} alt={"Profile"} />
            <div>
                <h2>Update Profile Picture</h2>
                <input className={scss.inputfile} id='fileinp' type="file" onChange={(e) => setPic(e.target.files[0])} />
                <label for="fileinp" className={scss.inputlabel}>Choose image</label>
                <button type='button' className={scss.inputlabel} onClick={upload}>Upload</button>
            </div>
            <img src={previewUrl} alt={"Preview"} />
        </div>
        </>
    );
};

export default SetImage;
