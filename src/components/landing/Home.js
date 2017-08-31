import React from 'react'
import NavBar from '../ui/NavBar'
import Egg from './home/Egg'
import BlogGallery from '../ui/BlogGallery'
import TitleWithLines from '../ui/TitleWithLines'
import Footer from '../ui/Footer'

const App = () => (
  <div className="app">
    <NavBar />
    <div className="content section bg-white landing">
      <div className="front-page">
        <h1>The One Stop Shop for Microservices</h1>

        <h3>
          KintoHub is a development platform that transforms you into a
          full-stack unicorn ninja that people can’t stop talking about.
        </h3>
        <h3>
          <strong>Coming soon to a keyboard near you.</strong>
        </h3>
      </div>
    </div>
    <div className="content notify-me-and-egg">
      {/* <NotifyMe /> */}
      <Egg />
    </div>
    <div className="section bg-light-blue">
      <div className="content">
        <TitleWithLines text="Follow our journey" />
        <BlogGallery />
      </div>
    </div>
    <Footer />
  </div>
)

export default App
