import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Prompt, Switch, Redirect } from 'react-router-dom'

import NavBarContainer from '../containers/app/NavBarContainer'
import SideBarContainer from '../containers/app/SideBarContainer'
import GlobalSaveBarContainer from '../containers/app/GlobalSaveBarContainer'
import BreadcrumbContainer from '../containers/app/BreadcrumbContainer'
import KintoBlockEndpointsContainer from '../containers/dashboard/documentation/KintoBlockEndpointsContainer'

import DashboardContainer from '../containers/DashboardContainer'
import WorkspacesContainer from '../containers/WorkspacesContainer'
import Market from './Market'

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    blockNavigate: PropTypes.bool.isRequired,
    goToLogin: PropTypes.func.isRequired,
    fetchWorkspaces: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  state = {
    isSideBarShownMobile: false
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload)
    if (this.props.isLoggedIn) {
      this.props.fetchWorkspaces()
    } else {
      this.props.goToLogin()
    }
  }

  componentWillReceiveProps() {
    if (!this.props.isLoggedIn) this.props.goToLogin()
  }

  toggleNav = () => {
    this.setState({ isSideBarShownMobile: !this.state.isSideBarShownMobile })
  }

  onUnload = e => {
    if (this.props.blockNavigate) {
      // make sure future version will show the same message
      const text =
        'There are unsaved changes on this page. What would you like to do?'
      e.returnValue = text
      return text
    }
  }

  render() {
    const { isLoading, firstWorkspaceId, match, isNotification } = this.props
    return (
      <div className={`app ${isNotification ? 'notify' : ''}`}>
        <Prompt
          when={this.props.blockNavigate}
          message={() =>
            'There are unsaved changes on this page. What would you like to do?'
          }
        />

        <NavBarContainer
          isSideBarShownMobile={this.state.isSideBarShownMobile}
          toggleNavHandler={this.toggleNav}
        />

        <SideBarContainer
          isSideBarShownMobile={this.state.isSideBarShownMobile}
        />

        <GlobalSaveBarContainer />

        {!isLoading && firstWorkspaceId ? (
          <div className="layout-inner">
            <BreadcrumbContainer />
            <Switch>
              <Route
                path={`${match.url}/dashboard/:workspaceId`}
                component={DashboardContainer}
              />
              <Route
                path={`${match.url}/workspaces`}
                component={WorkspacesContainer}
              />
              <Route
                path={`${
                  match.url
                }/kintoblocks/:id/versions/:version/:type/documentation`}
                component={KintoBlockEndpointsContainer}
              />
              <Route path={`${match.url}/market`} component={Market} />
              <Redirect to={`${match.url}/dashboard/${firstWorkspaceId}`} />
            </Switch>
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
