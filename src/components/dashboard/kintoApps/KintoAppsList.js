import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import KintoAppCardContainer from '../../../containers/dashboard/kintoApps/kintoAppsList/KintoAppCardContainer'

class KintoAppsList extends Component {
  static propTypes = {
    kintoApps: PropTypes.array.isRequired,
    lastFetched: PropTypes.instanceOf(Date)
  }

  componentDidMount() {
    const { lastFetched, fetchKintoApps } = this.props
    if (new Date() - lastFetched > 1000) {
      fetchKintoApps()
    }
  }

  render() {
    return (
      <div className="my-kintoapps">
        <div className="page-title">
          <h2>My Applications</h2>
          <Link to="create" className="button default">
            Create New Application
          </Link>
        </div>

        <div className="kintoapp-list">
          <Link to="create" className="kintoapp create">
            <div className="text">
              <img src="/images/icon-generic-application.svg" alt="" />
              <h3>Create New Application</h3>
            </div>
            <div className="icons">
              <div className="applications">
                <div className="dependency application" />
                <div className="dependency kintoblock-dep" />
              </div>
              <div className="add-new">
                <div className="inner" />
                <div className="pulsate" />
              </div>
            </div>
          </Link>
          {this.props.kintoApps.map((kintoApp, i) => (
            <KintoAppCardContainer kintoApp={kintoApp} key={i} index={i} />
          ))}
        </div>
      </div>
    )
  }
}

export default KintoAppsList
