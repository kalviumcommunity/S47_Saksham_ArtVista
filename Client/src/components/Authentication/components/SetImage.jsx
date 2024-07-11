import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import scss from './SetImage.module.css';
import defaultpic from '../imgs/defaultpic.jpg';
import Cookies from 'js-cookie';
import Navbar from '../../common/Navbar';
import Footer from '../../common/Footer';

const SetImage = () => {
    const [pic, setPic] = useState();
    const UserToken = Cookies.get('auth');
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
      const UserToken = Cookies.get('auth');
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
        <Navbar />
        <br /><br /><br /><br /><br />
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
        <br /><br /><br /><br /><br />
        <Footer />
        </>
    );
};

export default SetImage;


////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import scss from './SetImage.module.css';
// import defaultpic from '../imgs/defaultpic.jpg';
// import AvatarEditor from 'react-avatar-editor';

// const SetImage = () => {
//     const [pic, setPic] = useState();
//     const UserToken = localStorage.getItem('UserToken');
//     const navigate = useNavigate();
//     // const [previewUrl, setPreviewUrl] = useState();
//     const [blobUrl, setBlobUrl] = useState();
//     const [scale, setScale] = useState(1);
//     const [image, setImage] = useState(null);

//     if (!UserToken) {
//         navigate('/auth/login');
//     }

//     const upload = () => {
//         const formData = new FormData();
//         // formData.append('profileImage', image);
//         if (image) { 
//             // const blob = await fetch(image).then(response => response.blob());
//             formData.append('profileImage', image);
//           }

//         axios.post(`${import.meta.env.VITE_BACKEND}/imgupload`, formData, {
//             headers: {
//                 Authorization: `Bearer ${UserToken}`, 
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//         .then((response) => {
//             console.log(response);
//             navigate('/auth/editauth');
//         })
//         .catch((error) => {
//             // console.log(error.response.data);
//         });
//     };

//     // useEffect(() => {
//     //     if (pic) {
//     //         const imageUrl = URL.createObjectURL(pic);
//     //         setPreviewUrl(imageUrl);
//     //     }
//     // }, [pic]);


//     useEffect(() => {
//       const UserToken = localStorage.getItem('UserToken');
//       axios.get(`${import.meta.env.VITE_BACKEND}/getimg`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${UserToken}` 
//         },
//         responseType: 'blob'
//       })
//       .then(response => {
//         const blobUrl = URL.createObjectURL(response.data); 
//         setBlobUrl(blobUrl);
//         // console.log('Success:', response.data);
//       })
//       .catch(error => {
//         // console.error('Error:', error);
//         setBlobUrl(defaultpic);
//       });
//     }, []);

//     const handleScaleChange = (e) => {
//         const scale = parseFloat(e.target.value);
//         setScale(scale);
//     }

//     const handleFileChange = (e) => {
//         const pic = e.target.files[0];
//         if (pic) {
//         setImage(URL.createObjectURL(pic));
//         }
//     }

//     return (
//         <>
//         <button className={scss.Backbtn} onClick={() => navigate(-1)}>{"< Back"}</button>
//         <div className={scss.CompareCont}>
//             <img  src={blobUrl} alt={"Profile"} />
//             <div>
//                 <h2>Update Profile Picture</h2>
//                 <input className={scss.inputfile} id='fileinp' type="file" onChange={handleFileChange} />
//                 <label for="fileinp" className={scss.inputlabel}>Choose image</label>
//                 <button type='button' className={scss.inputlabel} onClick={upload}>Upload</button>
//             </div>
//             {/* <img src={image} alt={"Preview"} /> */}
//             {image && (
//           <>
//           <div className="cropper-wrapper">
//             <AvatarEditor
//               image={image}
//               width={200}
//               height={200}
//               border={1}
//               color={[255, 255, 255, 0.6]} 
//               scale={scale}
//               onScaleChange={handleScaleChange}
//               borderRadius={125}
//               crossOrigin="anonymous"
//             />
//           </div>
//             <div className="scale-control">
//               <label htmlFor="scale">Scale:</label>
//               <input
//                 id="scale"
//                 type="range"
//                 min="1"
//                 max="3"
//                 step="0.01"
//                 value={scale}
//                 onChange={handleScaleChange}
//               />
//             </div>
//           </>
//         )}
//         </div>
//         </>
//     );
// };

// export default SetImage;
