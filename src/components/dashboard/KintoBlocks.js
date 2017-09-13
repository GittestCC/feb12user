import React from 'react'
import { Route } from 'react-router-dom'
import KintoBlocksListContainer from '../../containers/dashboard/kintoBlocks/KintoBlocksListContainer'
import KintoBlockCreate from './kintoBlocks/KintoBlockCreate'
import KintoBlockManage from './kintoBlocks/KintoBlockManage'

const Kintoblocks = ({ match }) => (
  <div className="kintoblocks-master-container">
    <Route path={`${match.url}/list`} component={KintoBlocksListContainer} />
    <Route path={`${match.url}/create`} component={KintoBlockCreate} />
    <Route
      path={`${match.url}/:id/versions/:ver`}
      component={KintoBlockManage}
    />
  </div>
)

export default Kintoblocks
