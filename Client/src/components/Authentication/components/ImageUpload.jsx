import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageUploadForm = () => {
    const [pic, setPic] = useState();
    const UserToken = localStorage.getItem('UserToken');
    const navigate = useNavigate();

    if (!UserToken) {
        navigate('/auth/login');
    }

    const upload = () => {
        const formData = new FormData();
        formData.append('profileImage', pic);

        axios.post(`${import.meta.env.VITE_BACKEND}/imgupload`, formData, {
            headers: {
                Authorization: `Bearer ${UserToken}`, 
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    };

    return (
        <>
            <div>
                <input type="file" onChange={(e) => setPic(e.target.files[0])} />
                <button type='button' onClick={upload}>Upload</button>
            </div>
        </>
    );
};

export default ImageUploadForm;
