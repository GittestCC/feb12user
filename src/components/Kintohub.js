import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import Modal from 'react-modal'
import ReactGA from 'react-ga'

import configureStore from '../store/configureStore'
import { getAnalyticsId } from '../helpers/analyticsHelper'

import ScrollToTop from './ScrollToTop'
import ForgotPassword from './ForgotPassword'
import Analytics from './Analytics'
import RegisterSuccess from './RegisterSuccess'

import ErrorPageContainer from '../containers/ErrorPageContainer'
import ScrollToErrorOnSubmitContainer from '../containers/ScrollToErrorOnSubmitContainer'
import AppContainer from '../containers/AppContainer'
import AuthContainer from '../containers/AuthContainer'
import LogInContainer from '../containers/LogInContainer'
import NotificationsContainer from '../containers/NotificationsContainer'
import LoadingInterceptorContainer from '../containers/LoadingInterceptorContainer'
import LoadingSpinnerContainer from '../containers/LoadingSpinnerContainer'
import GithubConnectContainer from '../containers/GithubConnectContainer'
import AccountActivateContainer from '../containers/AccountActivateContainer'
import CreateNewPasswordContainer from '../containers/CreateNewPasswordContainer'

import '../style/app.css'

const Kintohub = () => {
  const analyticsId = getAnalyticsId()
  if (analyticsId) {
    ReactGA.initialize(analyticsId)
  }

  const history = createHistory()
  const store = configureStore(history)

  const isLoggedIn = store.getState().auth.isLoggedIn

  Modal.defaultStyles.overlay.backgroundColor = 'rgba(245, 249, 255, 0.9)'
  Modal.defaultStyles.overlay.zIndex = '10'
  Modal.setAppElement('#root')

  return (
    <Provider store={store}>
      <ErrorPageContainer>
        <AuthContainer>
          <LoadingInterceptorContainer />
          <LoadingSpinnerContainer />
          <NotificationsContainer />
          <ScrollToErrorOnSubmitContainer />
          <ConnectedRouter history={history}>
            <ScrollToTop>
              {analyticsId && <Route component={Analytics} />}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    isLoggedIn ? (
                      <Redirect to="/app" />
                    ) : (
                      <Redirect to="/log-in" />
                    )
                  }
                />

                <Route path="/app" component={AppContainer} />

                <Route key="1" path="/log-in" component={LogInContainer} />
                <Route
                  key="2"
                  path="/sign-up"
                  render={() => <LogInContainer flip={true} />}
                />
                <Route path="/register-success" component={RegisterSuccess} />
                <Route
                  key="3"
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route
                  key="4"
                  path="/create-new-password/:token"
                  component={CreateNewPasswordContainer}
                />
                <Route
                  path="/accountActivate/:token"
                  component={AccountActivateContainer}
                />
                <Route
                  path="/githubConnect"
                  component={GithubConnectContainer}
                />
                <Redirect to="/" />
              </Switch>
            </ScrollToTop>
          </ConnectedRouter>
        </AuthContainer>
      </ErrorPageContainer>
    </Provider>
  )
}

export default Kintohub
