import React, {useState} from 'react'
import Axios from 'axios'

function SetUser() {

  const [username, setUsername] = useState('');



  return (
    <>
    <div>
        setusername
    </div>
    <input type="text" name="" placeholder='myname123' />
    <button onClick={handlesubmit}>submit</button>
    </>
  )
}

export default SetUser