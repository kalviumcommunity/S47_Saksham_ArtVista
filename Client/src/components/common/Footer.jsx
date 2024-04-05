import React from 'react'
import Footercss from './css/Footer.module.css'
function Footer() {
  return (
    <div className={Footercss.footer} style={{textAlign: 'center', position: 'fixed', bottom: 0, left: 0, backgroundColor: 'rgb(219, 219, 219)', width: '100%', height: '5%'}}>
      <link rel="stylesheet" defaultValue={"contact usp"} href="" />
    </div>
  )
}

export default Footer