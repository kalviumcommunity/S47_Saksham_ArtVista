import React from 'react'
import homecss from './Home.module.css'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer';

function Home() {
  return (
    <>
    <Navbar />
    <div className={homecss.container}>
        <h1>hello world!</h1>
    </div>
    <Footer />
    </>
  )
}

export default Home;