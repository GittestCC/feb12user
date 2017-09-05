import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SideBar extends Component {
  render() {
    return (
      <div
        className={`sidebar ${this.props.isSideBarShownMobile ? 'show' : ''}`}
      >
        {/* TODO <div className="cover menu-open" /> */}
        <ul className="unstyled-list sidebar-list">
          <li className="sidebar-section">
            <ul className="sidebar-inner unstyled-list">
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="home">Home</h4>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="applications">Applications</h4>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="analytics">Analytics</h4>
                </Link>
              </li>
              <li className="sidebar-item selected">
                <Link to={'/'}>
                  <h4 className="kintoblocks">
                    Kintoblocks{' '}
                    <img
                      src={`${process.env
                        .PUBLIC_URL}/images/dashboard/icon-blue-new.svg`}
                      alt=""
                    />
                  </h4>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="sales-data">Sales Data</h4>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="services">Services</h4>
                </Link>
              </li>
            </ul>
          </li>
          <li className="sidebar-section">
            <ul className="unstyled-list sidebar-inner">
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="settings">App Settings</h4>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="hosting">Hosting</h4>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to={'/'}>
                  <h4 className="billing">Account Billing</h4>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideBar
