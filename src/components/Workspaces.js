import React from 'react'
import { Route } from 'react-router-dom'
import WorkspaceEditContainer from '../containers/workspaces/WorkspaceEditContainer'
import WorkspaceCreate from './workspaces/WorkspaceCreate'

const Workspaces = ({ match }) => (
  <div>
    <Route path={`${match.url}/create`} component={WorkspaceCreate} />
    <Route path={`${match.url}/:id/edit`} component={WorkspaceEditContainer} />
  </div>
)

export default Workspaces
