import React from 'react'
import { Route } from 'react-router-dom'
import KintoBlocks from './dashboard/KintoBlocks'
import KintoApps from './dashboard/KintoApps'
import Index from './dashboard/Index'

const Dashboard = ({ match }) => (
  <div>
    <Route path={`${match.url}/kintoblocks`} component={KintoBlocks} />
    <Route path={`${match.url}/kintoapps`} component={KintoApps} />
    <Route path={`${match.url}`} component={Index} />
  </div>
)

export default Dashboard
