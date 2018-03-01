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
    isLoaded: PropTypes.bool.isRequired
  }

  state = {
    isSideBarShownMobile: false
  }

  componentDidMount() {
    const {
      isLoggedIn,
      fetchWorkspaces,
      fetchCurrentUser,
      goToLogin
    } = this.props
    window.addEventListener('beforeunload', this.onUnload)
    if (isLoggedIn) {
      fetchWorkspaces()
      fetchCurrentUser()
    } else {
      goToLogin()
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
        'There are unsaved changes on this page. Are you sure you want to leave?'
      e.returnValue = text
      return text
    }
  }

  render() {
    const { isLoaded, firstWorkspaceId, match, isNotification } = this.props
    return (
      <div className={`app ${isNotification ? 'notify' : ''}`}>
        <Prompt
          when={this.props.blockNavigate}
          message={() =>
            'There are unsaved changes on this page. Are you sure you want to leave?'
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

        {isLoaded && firstWorkspaceId ? (
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
