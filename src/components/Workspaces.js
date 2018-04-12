import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AdminRoute from './app/AdminRoute'
import WorkspaceEditContainer from '../containers/workspaces/WorkspaceEditContainer'
import { isProduction } from '../helpers/pageHelper'
import ServicesList from './workspaces/ServicesList'
import WorkspaceCreate from './workspaces/WorkspaceCreate'

class Workspaces extends Component {
  componentDidMount() {
    const {
      selectedWorkspace,
      fetchWorkspace,
      workspaceSelect,
      firstWorkspaceId
    } = this.props
    if (!selectedWorkspace) {
      workspaceSelect(firstWorkspaceId)
      fetchWorkspace(firstWorkspaceId)
    }
  }

  render() {
    const { match, selectedWorkspace } = this.props
    return selectedWorkspace ? (
      <div>
        <Route path={`${match.url}/create`} component={WorkspaceCreate} />
        <AdminRoute
          path={`${match.url}/:id/edit`}
          component={WorkspaceEditContainer}
          workspaceUrl="id"
        />
        {isProduction() ? null : (
          <AdminRoute
            path={`${match.url}/:id/services`}
            component={ServicesList}
            workspaceUrl="id"
          />
        )}
      </div>
    ) : null
  }
}

export default Workspaces
