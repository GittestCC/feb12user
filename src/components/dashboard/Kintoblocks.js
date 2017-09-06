import React from 'react'
import { Route } from 'react-router-dom'
import KintoblockList from './kintoblocks/KintoblockList'

const Kintoblocks = ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={KintoblockList} />
  </div>
)

export default Kintoblocks
