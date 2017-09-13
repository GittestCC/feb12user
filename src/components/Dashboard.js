import React from 'react'
import { Route } from 'react-router-dom'
import KintoBlocks from './dashboard/KintoBlocks'

const Dashboard = ({ match }) => (
  <div>
    <Route path={`${match.url}/kintoBlocks`} component={KintoBlocks} />
  </div>
)

export default Dashboard
