import React from 'react'
import { Route } from 'react-router-dom'
import KintoBlocksListContainer from '../../containers/dashboard/kintoBlocks/KintoBlocksListContainer'
import KintoBlockManageContainer from '../../containers/dashboard/kintoBlocks/KintoBlockManageContainer'
import KintoBlockCreate from './kintoBlocks/KintoBlockCreate'

const Kintoblocks = ({ match }) => (
  <div className="kintoblocks-master-container">
    <Route path={`${match.url}/list`} component={KintoBlocksListContainer} />
    <Route path={`${match.url}/create`} component={KintoBlockCreate} />
    <Route
      path={`${match.url}/:id/versions/:ver`}
      component={KintoBlockManageContainer}
    />
  </div>
)

export default Kintoblocks
