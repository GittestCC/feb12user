import React from 'react'
import { Route } from 'react-router-dom'
import KintoAppsListContainer from '../../containers/dashboard/kintoApps/KintoAppsListContainer'
import KintoAppManageContainer from '../../containers/dashboard/kintoApps/KintoAppManageContainer'
import KintoAppCreate from './kintoApps/KintoAppCreate'

const KintoApps = ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={KintoAppsListContainer} />
    <Route path={`${match.url}/create`} component={KintoAppCreate} />
    <Route
      path={`${match.url}/:id/versions/:ver`}
      component={KintoAppManageContainer}
    />
  </div>
)

export default KintoApps
