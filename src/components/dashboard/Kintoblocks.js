import React from 'react'
import { Route } from 'react-router-dom'
import KintoblockList from './kintoblocks/KintoblockList'
import KintoblockCreate from './kintoblocks/KintoblockCreate'
import KintoBlockManage from './kintoblocks/KintoBlockManage'

const Kintoblocks = ({ match }) => (
  <div className="kintoblocks-master-container">
    <Route path={`${match.url}/list`} component={KintoblockList} />
    <Route path={`${match.url}/create`} component={KintoblockCreate} />
    <Route path={`${match.url}/manage`} component={KintoBlockManage} />
  </div>
)

export default Kintoblocks
