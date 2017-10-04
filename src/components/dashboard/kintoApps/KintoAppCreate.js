import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import KintoAppFormContainer from '../../../containers/dashboard/kintoApps/KintoAppFormContainer.js'

class KintoAppCreate extends Component {
  render() {
    return (
      <div className="create-kintoapp">
        <div className="breadcrumbs">
          <ul className="unstyled-list">
            <li>
              <Link to="list">Applications</Link>
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <a href="" className="disabled">
                Awesome Application
              </a>
            </li>
          </ul>
        </div>

        <h2>Create New Application</h2>
        <div className="what-is-a-kintoapp">
          <div className="text">
            <h5>What is an Application?</h5>
            <h5 className="body-copy">
              KintoApp is our proprietary format of microservice. They allow you
              to build a website and offer online services with ease and speed.
              Anyone can use and sell their KintoApps on our website. You can{' '}
              <Link to="/about-us">learn more here.</Link>
            </h5>
          </div>
          <div className="icon" />
        </div>

        <KintoAppFormContainer version="0.1.0" isCreate={true} />
      </div>
    )
  }
}

export default KintoAppCreate
