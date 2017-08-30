import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

import Home from './components/landing/Home'
import AboutUs from './components/landing/AboutUs'
import ContactUs from './components/landing/ContactUs'
import Blog from './components/landing/Blog'
import './style/app.css'

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/blog" component={Blog} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
