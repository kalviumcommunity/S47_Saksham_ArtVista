import React, { useState } from 'react'
import pcss from './css/Profile.module.css'
function ProfileDisplay() {
  const [profile, setProfile] = useState({})
  const visit_user = localStorage.getItem('visit_user')
  return (
    <div className={pcss.flex}>
      <div className={pcss.profile}>
      {visit_user && (
        <div>
          <p>Account Name: {visit_user}</p>
        </div>
      )}
    </div>
    </div>
  )
}

export default ProfileDisplay