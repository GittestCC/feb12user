import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import KintoAppsListContainer from '../../containers/dashboard/kintoApps/KintoAppsListContainer'
import KintoAppManageContainer from '../../containers/dashboard/kintoApps/KintoAppManageContainer'
import KintoAppCreate from './kintoApps/KintoAppCreate'
import KintoAppEnvironmentsListContainer from '../../containers/dashboard/kintoApps/KintoAppEnvironmentsListContainer'
import KintoAppEnvironmentEditContainer from '../../containers/dashboard/kintoApps/KintoAppEnvironmentEditContainer'
import KintoAppLogsContainer from '../../containers/dashboard/kintoApps/KintoAppLogsContainer'
import KintoAppChangelogsContainer from '../../containers/dashboard/kintoApps/KintoAppChangelogsContainer'

import KintoAppDependenciesConfigContainer from '../../containers/dashboard/kintoApps/KintoAppDependenciesConfigContainer'

class KintoApps extends Component {
  static propTypes = {
    fetchKintoApps: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    isLoaded: false
  }

  componentDidMount() {
    this.props.fetchKintoApps().then(() => {
      this.setState({ isLoaded: true })
    })
  }

  render() {
    const { url } = this.props.match
    return this.state.isLoaded ? (
      <div>
        <Route path={`${url}/list`} component={KintoAppsListContainer} />
        <Route path={`${url}/create`} component={KintoAppCreate} />
        <Route
          exact
          path={`${url}/:id/versions/:ver`}
          component={KintoAppManageContainer}
        />
        <Route
          path={`${url}/:id/environments`}
          component={KintoAppEnvironmentsListContainer}
        />
        <Route
          path={`${url}/:id/environment/:envId/edit`}
          component={KintoAppEnvironmentEditContainer}
        />
        <Route
          path={`${url}/:id/versions/:ver/config/:env`}
          component={KintoAppDependenciesConfigContainer}
        />
        <Route
          path={`${url}/:id/environment/:envId/logs/:releaseVersion`}
          component={KintoAppLogsContainer}
        />
        <Route
          path={`${url}/:id/changelogs`}
          component={KintoAppChangelogsContainer}
        />
      </div>
    ) : null
  }
}

export default KintoApps
