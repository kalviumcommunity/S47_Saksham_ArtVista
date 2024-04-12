import React from 'react'
import lcss from './loader.module.css'
function loader() {
  return (
    <div className={lcss.centerload}>
    <div className={lcss.loading}></div>
  </div>
  )
}

export default loader;