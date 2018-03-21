import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import KintoBlocksContainer from '../containers/dashboard/KintoBlocksContainer'
import KintoAppsContainer from '../containers/dashboard/KintoAppsContainer'
import KintoBlockEndpointsContainer from '../containers/dashboard/documentation/KintoBlockEndpointsContainer'
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
          <Route
            path={`${
              match.url
            }/kintoblocks/:id/versions/:version/:type/documentation`}
            component={KintoBlockEndpointsContainer}
          />
          <Route
            path={`${match.url}/kintoblocks`}
            component={KintoBlocksContainer}
          />
          <Route
            path={`${match.url}/kintoapps`}
            component={KintoAppsContainer}
          />
          <Route path={`${match.url}`} component={Index} />
        </Switch>
      </div>
    ) : null
  }
}

export default Dashboard
