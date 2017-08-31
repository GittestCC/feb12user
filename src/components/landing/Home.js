import React from 'react'
import NavBar from '../ui/NavBar'
import Egg from './home/Egg'
import BlogGallery from '../ui/BlogGallery'
import TitleWithLines from '../ui/TitleWithLines'
import scrollArrow from '../../images/icon-scroll-down-arrow.svg'
import Footer from '../ui/Footer'

const App = () => (
  <div className="app">
    <NavBar />
    <div className="content section bg-white landing">
      <div className="front-page">
        <h1>The One Stop Shop for Microservices</h1>

        <h3>
          Kintohub is a platform humbly aiming to make developers' lives easier
          on planet Earth - propulsing microservices in a magic cloud.
        </h3>
        <h3>
          <strong>Coming soon to a keyboard near you.</strong>
        </h3>
      </div>
    </div>
    <div className="content notify-me-and-egg">
      {/* <NotifyMe /> */}
      <Egg />
      <div className="scroll-for-more">
        <h6>Scroll down for more</h6>
        <img src={scrollArrow} alt="" />
      </div>
    </div>
    <div className="section bg-light-blue">
      <div className="content">
        <TitleWithLines text="Follow our journey" />
        <BlogGallery />
      </div>
    </div>
    <Footer footerColor="bg-light-blue" />
  </div>
)

export default App
