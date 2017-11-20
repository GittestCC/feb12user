import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Prompt, Switch, Redirect } from 'react-router-dom'

import NavBarContainer from '../containers/app/NavBarContainer'
import SideBarContainer from '../containers/app/SideBarContainer'
import GlobalSaveBarContainer from '../containers/app/GlobalSaveBarContainer'
import BreadcrumbContainer from '../containers/app/BreadcrumbContainer'

import Dashboard from './Dashboard'
import Workspaces from './Workspaces'
import Market from './Market'

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    blockNavigate: PropTypes.bool.isRequired,
    goToLogin: PropTypes.func.isRequired
  }

  state = {
    isSideBarShownMobile: false
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload)
    if (this.props.isLoggedIn) {
      this.props.fetchWorkspaces()
      //TODO: replace with a real workspace url select
      this.props.workspaceSelect('1')
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
      const text = 'Changes you made may not be saved'
      e.returnValue = text
      return text
    }
  }

  render() {
    return (
      <div className="app">
        <Prompt
          when={this.props.blockNavigate}
          message={() => 'Changes you made may not be saved'}
        />

        <NavBarContainer
          isSideBarShownMobile={this.state.isSideBarShownMobile}
          toggleNavHandler={this.toggleNav}
        />

        <SideBarContainer
          isSideBarShownMobile={this.state.isSideBarShownMobile}
        />

        <GlobalSaveBarContainer />

        {!this.props.isLoading ? (
          <div className="layout-inner">
            <BreadcrumbContainer />
            <Switch>
              <Route
                path={`${this.props.match.url}/dashboard`}
                component={Dashboard}
              />
              <Route
                path={`${this.props.match.url}/workspaces`}
                component={Workspaces}
              />
              <Route
                path={`${this.props.match.url}/market`}
                component={Market}
              />
              <Redirect to={`${this.props.match.url}/dashboard`} />
            </Switch>
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
