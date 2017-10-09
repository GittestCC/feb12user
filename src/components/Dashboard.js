import React from 'react'
import { Route } from 'react-router-dom'
import KintoBlocks from './dashboard/KintoBlocks'
import KintoApps from './dashboard/KintoApps'

const Dashboard = ({ match }) => (
  <div>
    <Route path={`${match.url}/kintoblocks`} component={KintoBlocks} />
    <Route path={`${match.url}/kintoapps`} component={KintoApps} />
  </div>
)

export default Dashboard
