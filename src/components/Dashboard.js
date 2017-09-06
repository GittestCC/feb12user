import React from 'react'
import { Route } from 'react-router-dom'
import Kintoblocks from './dashboard/Kintoblocks'

const Dashboard = ({ match }) => (
  <div>
    <Route path={`${match.url}/kintoblocks`} component={Kintoblocks} />
  </div>
)

export default Dashboard
