import React from 'react'
import css from './css/Footer.module.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className={css.footer}>
      <div className={css.linksdiv}>
        <p>Created By : Saksham Gupta</p>
        <div className={css.linkss}>
          <div onClick={() => window.open('https://github.com/sckchcm-g', '_blank')} className={css.linkss}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
            <a href="https://github.com/sckchcm-g">Github</a>
          </div>
          <div onClick={() => window.open('https://www.linkedin.com/in/saksham-gupta-87a1a427b/', '_blank')} className={css.linkss}>
              <img src="http://res.cloudinary.com/dz4ycvkkw/image/upload/v1720600547/f37glu3asilxr8nwpipv.png" alt="" />
              <a href="https://www.linkedin.com/in/saksham-gupta-87a1a427b/">Linkedin</a>
          </div>
        </div>
        <p>Capstone Project 1</p>
      </div>
      <div className={css.linksdiv}>
        <h3>Explore Our Website</h3>
        <Link to="/explore"><a>Explore us</a></Link>
        <Link to="/search"><a>Search here</a></Link>
        <Link to="/auth/editauth"><a>Visit Profile</a></Link>
      </div>
      <div className={css.linksdiv}>
        <h3>Try Out these tools</h3>
        <Link to="/create"><a>Create a new Post</a></Link>
        <Link to="/auth/config/setimage"><a>Change Profile picture</a></Link>
        <Link to="/auth/config/setuser"><a>Change your Username</a></Link>
      </div>
      <div className={css.linksdiv}>
        <h3>Get Help</h3>
        <a href="https://docs.google.com/document/d/10iRHbmSEkfI3yg6M_pISmJgQ5cZD0oeLPk6b2S-Gdv8/edit?usp=sharing">Read the docs</a>
        <a href="https://api.whatsapp.com/send?phone=1234567890">Whatsapp us !</a>
        <a href="mailto:sparkysaksham.dev@google.com?subject=Contact%20Us%20in%20ArtvistaHere&body=I%20am%20interested%20in%20your%20services">Mail us !</a>
      </div>
    </div>
  )
}

export default Footer
