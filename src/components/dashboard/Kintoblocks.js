import React from 'react'
import { Route } from 'react-router-dom'
import KintoblockList from './kintoblocks/KintoblockList'
import KintoblockCreate from './kintoblocks/KintoblockCreate'

const Kintoblocks = ({ match }) => (
  <div className="kintoblocks-master-container">
    <Route path={`${match.url}/list`} component={KintoblockList} />
    <Route path={`${match.url}/create`} component={KintoblockCreate} />
  </div>
)

export default Kintoblocks
