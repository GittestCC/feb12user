import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import KintoBlockManageForm from './kintoBlockManage/KintoBlockManageForm'

class KintoBlockManage extends Component {
  render() {
    return (
      <div className="kintoblock-manage">
        <div className="breadcrumbs">
          <ul className="unstyled-list">
            <li>
              <Link to="list">KintoBlocks</Link>
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <a href="#">Awesome KintoBlock</a>
              <img src="/images/icon-breadcrumb.svg" alt="" />
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <a href="#">1.0.3</a>
              <img src="/images/icon-breadcrumb.svg" alt="" />
            </li>
          </ul>
        </div>

        <div className="page-title">
          <h2>
            Awesome KintoBlock <div className="status h6 draft">draft</div>
          </h2>
          <Link to="create" className="button secondary">
            Create New Kintoblock
          </Link>
        </div>

        <KintoBlockManageForm />
      </div>
    )
  }
}

export default KintoBlockManage
