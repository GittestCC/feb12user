import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
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

import AppContainer from './containers/AppContainer'
import './style/app.css'

const history = createHistory()
const store = configureStore(history)

const SignUp = () => <LogIn flip={true} />

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/blog" component={Blog} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/app" component={AppContainer} />
        </div>
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
