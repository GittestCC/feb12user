import React from 'react'
import KintoAppManageForm from './kintoAppManage/KintoAppManageForm'
import { Link } from 'react-router-dom'

const KintoAppManage = () => {
  return (
    <div className="kinto-app-manage">
      <div className="breadcrumbs">
        <ul className="unstyled-list">
          <li>
            <Link to="list">Applications</Link>
            <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
          </li>
          <li>
            <a href="">Awesome Application</a>
            <img src="/images/icon-breadcrumb.svg" alt="" />
            <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
          </li>
          <li>
            <a href="">1.0.3</a>
            <img src="/images/icon-breadcrumb.svg" alt="" />
          </li>
        </ul>
      </div>

      <h1>Kinto App Manage</h1>
      <KintoAppManageForm />
    </div>
  )
}

export default KintoAppManage
