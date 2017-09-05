import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LandingNavBar extends Component {
  state = {
    hideNav: true
  }

  openCloseMobileNav = () => {
    this.setState({ hideNav: !this.state.hideNav })
  }

  render() {
    return (
      <nav className="main-navigation">
        <div className="mobile-menu-toggle" onClick={this.openCloseMobileNav} />

        <Link to={'/'}>
          <div className="navigation-logo" />
        </Link>
        <Link to={'/'}>
          <div className="mobile-navigation-logo" />
        </Link>
        <ul
          className={`mobile-menu unstyled-list ${this.state.hideNav
            ? 'hidden'
            : ''}`}
        >
          <li>
            <a
              href="https://medium.com/kintohub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5>Blog</h5>
            </a>
          </li>
          <li>
            <Link to={'/about-us'}>
              <h5>About Us</h5>
            </Link>
          </li>
          <li>
            <Link to={'/contact-us'}>
              <h5>Contact Us</h5>
            </Link>
          </li>
          {/* <li>
            <Link to={'/log-in'} className="button secondary">
              Log In
            </Link>
            </li>
            <li>
            <Link to={'/sign-up'} className="button default">
              Sign Up
            </Link>
          </li> */}
        </ul>

        <div className="navigation-links">
          <ul className="unstyled-list">
            <li>
              <a
                href="https://medium.com/kintohub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h5>Blog</h5>
              </a>
            </li>
            <li>
              <Link to={'/about-us'}>
                <h5>About Us</h5>
              </Link>
            </li>
            <li>
              <Link to={'/contact-us'}>
                <h5>Contact Us</h5>
              </Link>
            </li>
            {/* <li>
              <Link
                to={'/log-in'}
                className="button secondary navigation-button"
              >
                Log In
              </Link>
              </li>
              <li>
              <Link
                to={'/sign-up'}
                className="button default navigation-button"
              >
                {' '}
                Sign Up
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    )
  }
}

export default LandingNavBar
