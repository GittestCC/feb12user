import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/landing/Home';
import AboutUs from './components/landing/AboutUs';
import ContactUs from './components/landing/ContactUs';
import Blog from './components/landing/Blog';
import './style/app.css';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/blog" component={Blog} />
    </div>
  </Router>,
  document.getElementById('root')
);
