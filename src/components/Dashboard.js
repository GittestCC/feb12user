import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import KintoBlocks from './dashboard/KintoBlocks'
import KintoApps from './dashboard/KintoApps'
import Index from './dashboard/Index'

class Dashboard extends Component {
  static propTypes = {
    workspaceId: PropTypes.string,
    fetchWorkspace: PropTypes.func.isRequired,
    workspaceSelect: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { workspaceId, fetchWorkspace, workspaceSelect } = this.props
    fetchWorkspace(workspaceId)
    workspaceSelect(workspaceId)
  }

  componentWillReceiveProps(nextProps) {
    const { workspaceId, fetchWorkspace, workspaceSelect } = this.props
    if (workspaceId !== nextProps.workspaceId) {
      fetchWorkspace(nextProps.workspaceId)
      workspaceSelect(nextProps.workspaceId)
    }
  }

  render() {
    const { match, selectedWorkspace } = this.props

    return selectedWorkspace ? (
      <div>
        <Switch>
          <Route path={`${match.url}/kintoblocks`} component={KintoBlocks} />
          <Route path={`${match.url}/kintoapps`} component={KintoApps} />
          <Route path={`${match.url}`} component={Index} />
        </Switch>
      </div>
    ) : null
  }
}

export default Dashboard
