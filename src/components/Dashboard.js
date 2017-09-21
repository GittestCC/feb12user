import React from 'react'
import { Route } from 'react-router-dom'
import KintoBlocks from './dashboard/KintoBlocks'
import KintoApps from './dashboard/KintoApps'

const Dashboard = ({ match }) => (
  <div>
    <Route path={`${match.url}/kintoBlocks`} component={KintoBlocks} />
    <Route path={`${match.url}/kintoApps`} component={KintoApps} />
  </div>
)

export default Dashboard
