import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import Modal from 'react-modal'
import ReactGA from 'react-ga'

import configureStore from '../store/configureStore'
import { isProduction } from '../helpers/pageHelper'
import { getAnalyticsId } from '../helpers/analyticsHelper'

import Home from './landing/Home'
import AboutUs from './landing/AboutUs'
import ContactUs from './landing/ContactUs'
import Blog from './landing/Blog'
import LogIn from './LogIn'
import ScrollToTop from './ScrollToTop'
import ForgotPassword from './ForgotPassword'
import CreateNewPassword from './CreateNewPassword'
import Analytics from './Analytics'
import AppCrashErrorDisplay from './AppCrashErrorDisplay'

import ScrollToErrorOnSubmitContainer from '../containers/ScrollToErrorOnSubmitContainer'
import AppContainer from '../containers/AppContainer'
import AuthContainer from '../containers/AuthContainer'
import '../style/app.css'

const Kintohub = () => {
  const analyticsId = getAnalyticsId()
  if (analyticsId) {
    ReactGA.initialize(analyticsId)
  }

  const history = createHistory()
  const store = configureStore(history)

  const isLoggedIn = store.getState().auth.token

  const SignUp = () => <LogIn flip={true} />

  Modal.defaultStyles.overlay.backgroundColor = 'rgba(245, 249, 255, 0.9)'
  Modal.defaultStyles.overlay.zIndex = '10'
  Modal.setAppElement('#root')

  return (
    <AppCrashErrorDisplay>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <ScrollToErrorOnSubmitContainer />
            {analyticsId && <Route component={Analytics} />}
            <div>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    isLoggedIn ? (
                      <Redirect to="/app" />
                    ) : (
                      <Redirect to="/home" />
                    )
                  }
                />
                <Route path="/home" component={Home} />
                <Route path="/about-us" component={AboutUs} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/blog" component={Blog} />
                <Route path="/app" component={AppContainer} />

                {!isProduction()
                  ? [
                      <Route key="1" path="/log-in" component={LogIn} />,
                      <Route key="2" path="/sign-up" component={SignUp} />,
                      <Route
                        key="3"
                        path="/forgot-password"
                        component={ForgotPassword}
                      />,
                      <Route
                        key="4"
                        path="/create-new-password"
                        component={CreateNewPassword}
                      />
                    ]
                  : null}

                <Redirect to="/" />
              </Switch>
              <Route component={AuthContainer} />
            </div>
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    </AppCrashErrorDisplay>
  )
}

export default Kintohub
