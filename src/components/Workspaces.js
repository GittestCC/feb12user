import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import WorkspaceEditContainer from '../containers/workspaces/WorkspaceEditContainer'
import GithubConnectContainer from '../containers/workspaces/GithubConnectContainer'
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
    const { url } = this.props.match
    return (
      <div>
        <Route path={`${url}/create`} component={WorkspaceCreate} />
        <Route path={`${url}/:id/edit`} component={WorkspaceEditContainer} />
        <Route
          path={`${url}/githubConnect`}
          component={GithubConnectContainer}
        />
      </div>
    )
  }
}

export default Workspaces
