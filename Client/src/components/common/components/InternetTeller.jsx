import React from 'react'
import icss from './InternetTeller.module.css'

function InternetTeller() {
  return (
    <>
    <p className={icss.txtup}>UNABLE TO CONNECT TO THE DATABASE</p>
    <p className={icss.txtlow}>MAKE SURE YOU ARE CONNECTED TO THE INTERNET</p>
    </>
  )
}

export default InternetTeller;