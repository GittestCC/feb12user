import React, { Component } from 'react'
import { Route, Prompt, Switch, Redirect } from 'react-router-dom'

import NavBarContainer from '../containers/app/NavBarContainer'
import SideBarContainer from '../containers/app/SideBarContainer'
import GlobalSaveBarContainer from '../containers/app/GlobalSaveBarContainer'

import Dashboard from './Dashboard'
import Market from './Market'

class App extends Component {
  state = {
    isSideBarShownMobile: false
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload)
    if (!this.props.isLoggedIn) this.props.goToLogin()
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

        <div className="layout-inner">
          <Switch>
            <Route
              path={`${this.props.match.url}/dashboard`}
              component={Dashboard}
            />
            <Route path={`${this.props.match.url}/market`} component={Market} />
            <Redirect to={`${this.props.match.url}/dashboard`} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
