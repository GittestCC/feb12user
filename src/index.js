import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import Modal from 'react-modal'

import configureStore from './store/configureStore'
import { isProduction } from './helpers/pageHelper'

import Home from './components/landing/Home'
import AboutUs from './components/landing/AboutUs'
import ContactUs from './components/landing/ContactUs'
import Blog from './components/landing/Blog'
import LogIn from './components/LogIn'
import ScrollToTop from './components/ScrollToTop'
import ForgotPassword from './components/ForgotPassword'
import CreateNewPassword from './components/CreateNewPassword'
import ScrollToErrorOnSubmitContainer from './containers/ScrollToErrorOnSubmitContainer'

import AppContainer from './containers/AppContainer'
import AuthContainer from './containers/AuthContainer'
import './style/app.css'

const history = createHistory()
const store = configureStore(history)

const isLoggedIn = store.getState().auth.token

const SignUp = () => <LogIn flip={true} />

Modal.defaultStyles.overlay.backgroundColor = 'rgba(245, 249, 255, 0.9)'
Modal.defaultStyles.overlay.zIndex = '10'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <ScrollToErrorOnSubmitContainer />
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/home" />
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
  </Provider>,
  document.getElementById('root')
)
