import React from 'react'
import { Link } from 'react-router-dom'
// import facebookIcon from '../../images/footer-socials-facebook.svg'
import twitterIcon from '../../images/footer-socials-twitter.svg'
import githubIcon from '../../images/footer-socials-github.svg'
import linkedinIcon from '../../images/footer-socials-linkedin.svg'
// import angellistIcon from '../../images/footer-socials-angellist.svg'
import greyKintoLogo from '../../images/logo-grey-single-color.svg'

const Footer = ({ footerColor }) => (
  <footer className={footerColor} style={{ minHeight: '140px' }}>
    <div className="content">
      <div className="line" />
      <div className="footer">
        <div className="left">
          <ul className="unstyled-list">
            {/* <li className="list-item">
              <Link to={'/about-us'}>Service Status</Link>
            </li> */}
            <li className="list-item">
              <Link to={'/contact-us'}>Contact Us</Link>
            </li>
            {/* <li className="list-item">
              <Link to={'/about-us'}>Privacy Policy</Link>
            </li> */}
            {/* <li className="list-item">
              <Link to={'/about-us'}>Terms and Conditions</Link>
            </li> */}
            {/* <li className="list-item">
              <Link to={'/about-us'}>Site Map</Link>
            </li> */}
          </ul>

          <h6 className="byline">
            Copyright © 2017 KintoHub. All rights reserved.
          </h6>
        </div>

        <div className="right">
          <ul className="social-icons unstyled-list">
            <li className="social-icon">
              <a
                href="https://twitter.com/kintohub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitterIcon} alt="" />
              </a>
            </li>
            {/* <li className="social-icon">
              <Link to={'/about-us'}>
                <img src={facebookIcon} alt="" />
              </Link>
            </li> */}
            <li className="social-icon">
              <a
                href="https://github.com/kintohub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={githubIcon} alt="" />
              </a>
            </li>
            <li className="social-icon">
              <a
                href="https://www.linkedin.com/company/13376177/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="" />
              </a>
            </li>
            {/* <li className="social-icon">
              <Link to={'/about-us'}>
                <img src={angellistIcon} alt="" />
              </Link>
            </li> */}
          </ul>

          <Link to={'/'}>
            <div className="footer-logo">
              <img src={greyKintoLogo} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </footer>
)
export default Footer
