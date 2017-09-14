import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import configureStore from './store/configureStore'

import Home from './components/landing/Home'
import AboutUs from './components/landing/AboutUs'
import ContactUs from './components/landing/ContactUs'
import Blog from './components/landing/Blog'
import LogIn from './components/LogIn'
import ScrollToTop from './components/ScrollToTop'
import ForgotPassword from './components/ForgotPassword'
import CreateNewPassword from './components/CreateNewPassword'

import AppContainer from './containers/AppContainer'
import AuthContainer from './containers/AuthContainer'
import './style/app.css'

const history = createHistory()
const store = configureStore(history)

const isLoggedIn = store.getState().auth.token

const SignUp = () => <LogIn flip={true} />

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (isLoggedIn ? <Redirect to="/app" /> : <Home />)}
            />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/blog" component={Blog} />
            <Route path="/log-in" component={LogIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/create-new-password" component={CreateNewPassword} />
            <Route path="/app" component={AppContainer} />
          </Switch>
          <Route component={AuthContainer} />
        </div>
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
