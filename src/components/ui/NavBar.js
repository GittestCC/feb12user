import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () =>
  <nav className="main-navigation">
    <div className="mobile-menu-toggle" />

    <Link to={'/'}>
      <div className="navigation-logo" />
    </Link>
    <div className="mobile-navigation-logo" />
    <ul className="mobile-menu unstyled-list hidden">
      <li>
        <Link to={'/blog'}>
          <h5>Blog</h5>
        </Link>
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
      <li>
        <div className="button">Log In</div>
      </li>
      <li>
        <div className="button default">Sign Up</div>
      </li>
    </ul>

    <div className="navigation-links">
      <ul className="unstyled-list">
        <li>
          <a href="https://medium.com/kintohub" target="_blank" rel="noopener noreferrer">
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
      </ul>
    </div>
  </nav>;

export default NavBar;
