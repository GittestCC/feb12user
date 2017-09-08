import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import KintoBlockCreateForm from './kintoblockCreate/KintoBlockCreateForm'

class KintoblockCreate extends Component {
  render() {
    return (
      <div>
        <h2>Create Kintoblocks</h2>
        <div className="what-is-a-kintoblock">
          <div className="text">
            <h5>What is a KintoBlock?</h5>
            <h5 className="body-copy">
              KintoBlock is our proprietary format of microservice. They allow
              you to build a website and offer online services with ease and
              speed. Anyone can use and sell their KintoBlocks on our website.
              You can <Link to="/about-us">learn more here.</Link>
            </h5>
          </div>
          <div className="icon" />
        </div>
        <KintoBlockCreateForm />
      </div>
    )
  }
}

export default KintoblockCreate
