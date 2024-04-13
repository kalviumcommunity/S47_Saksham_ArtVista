import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ authToken }) => {
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!imageFile) {
            setMessage('Please select an image');
            return;
        }
    }


    // return (
    //     <form action='/api/upload' method='POST' enctype='multipart/form-data' >
    //         <h1>Profile Image Upload</h1>
    //         <input type="file" name='profile' onChange={handleImageChange} />
    //         <button onClick={uploadImage}>Upload Image</button>
    //         <div>{message}</div>
    //     </form>
    // );
};

export default ImageUploadForm;

