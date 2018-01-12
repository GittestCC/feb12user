import React from 'react'
import { Route } from 'react-router-dom'
import KintoAppsListContainer from '../../containers/dashboard/kintoApps/KintoAppsListContainer'
import KintoAppManageContainer from '../../containers/dashboard/kintoApps/KintoAppManageContainer'
import KintoAppCreate from './kintoApps/KintoAppCreate'
import KintoAppEnvironmentsListContainer from '../../containers/dashboard/kintoApps/KintoAppEnvironmentsListContainer'
import KintoAppEnvironmentEditContainer from '../../containers/dashboard/kintoApps/KintoAppEnvironmentEditContainer'
import KintoAppLogsContainer from '../../containers/dashboard/kintoApps/KintoAppLogsContainer'

import KintoAppDependenciesConfigContainer from '../../containers/dashboard/kintoApps/KintoAppDependenciesConfigContainer'

const KintoApps = ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={KintoAppsListContainer} />
    <Route path={`${match.url}/create`} component={KintoAppCreate} />
    <Route
      exact
      path={`${match.url}/:id/versions/:ver`}
      component={KintoAppManageContainer}
    />
    <Route
      path={`${match.url}/:id/environments`}
      component={KintoAppEnvironmentsListContainer}
    />
    <Route
      path={`${match.url}/:id/environment/:envId/edit`}
      component={KintoAppEnvironmentEditContainer}
    />
    <Route
      path={`${match.url}/:id/versions/:ver/config/:env`}
      component={KintoAppDependenciesConfigContainer}
    />
    <Route
      path={`${match.url}/:id/environment/:envId/logs/:releaseVersion`}
      component={KintoAppLogsContainer}
    />
  </div>
)

export default KintoApps
