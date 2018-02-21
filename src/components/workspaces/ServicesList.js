import React, { Component } from 'react'
import KintoBlockServicesContainer from '../../containers/workspaces/servicesList/KintoBlockServicesContainer'
import AnalyticsServicesContainer from '../../containers/workspaces/servicesList/AnalyticsServicesContainer'

class ServicesList extends Component {
  render() {
    return (
      <div className="service-list">
        <KintoBlockServicesContainer />
        <div className="line" />
        <AnalyticsServicesContainer />
      </div>
    )
  }
}

export default ServicesList
