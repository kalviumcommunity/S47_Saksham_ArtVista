import React, {useState} from 'react'
import Createcss from './css/Create.module.css'

function Modify() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();



  return (
    <>
    <button onClick={() => window.history.back()}>{"back <"}</button>
    <div className={`${Createcss.container}`}>
        <div className={`${Createcss.formconts}`}>
          {/* <form onSubmit={handleSubmit}> */}
            <div className={`${Createcss.textareatitle}`}>
              <p htmlFor="title">Title: </p>
              <input
                type='text'
                placeholder='title'
                // onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={`${Createcss.imglink}`}>
              <p htmlFor="image">Image Link</p>
              <input
                type='url'
                name='image'
                placeholder='******'
                // onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className={`${Createcss.textareadesc}`}>
              <p htmlFor="description">Description: </p>
              <textarea
                placeholder='Describe about your post here'
                // onChange={(e) => setDescription(e.target.value)}
                className={`${Createcss.textareadesc}`}
                wrap="soft" 
              />
            </div>
            <button type='submit'>Submit</button>
            {/* <p className={`${Createcss.terms}`}>{error || "By clicking on Submit, you agree to our terms and conditions" }</p> */}
          {/* </form> */}
        </div>

        <div className={`${Createcss.imgdispdiv}`}>
          <img
            src={image}
            alt='Img could not be displayed'
            className={`${Createcss.imgdisplay}`}
          />
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modify;