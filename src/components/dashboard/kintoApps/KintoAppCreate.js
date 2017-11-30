import React from 'react'
import { Link } from 'react-router-dom'
import KintoAppFormContainer from '../../../containers/dashboard/kintoApps/KintoAppFormContainer'

const KintoAppCreate = () => (
  <div className="create-kintoapp">
    <h2>Create New Application</h2>
    <div className="what-is-a-kintoapp">
      <div className="text">
        <h5>What is an Application?</h5>
        <h5 className="body-copy">
          KintoApp is our proprietary format of microservice. They allow you to
          build a website and offer online services with ease and speed. Anyone
          can use and sell their KintoApps on our website. You can{' '}
          <Link to="/about-us">learn more here.</Link>
        </h5>
      </div>
      <div className="icon" />
    </div>

    <KintoAppFormContainer version="0.1.0" isCreate={true} />
  </div>
)

export default KintoAppCreate
