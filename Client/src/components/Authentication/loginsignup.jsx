import React from 'react'
import { Link } from 'react-router-dom'
function loginsignup() {
  return (
    <div>
        <div>
            <Link to="/auth/login">Login here</Link>
        </div>
        <div>
            <h3>You new here ?</h3>
            <Link to="/auth/signup">Signup here</Link>
        </div>
    </div>
  )
}

export default loginsignup