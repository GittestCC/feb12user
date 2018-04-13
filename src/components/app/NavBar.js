import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import PropTypes from 'prop-types'
import { isProduction } from '../../helpers/pageHelper'

class NavBar extends Component {
  static propTypes = {
    isDashboard: PropTypes.bool.isRequired,
    isSideBarShownMobile: PropTypes.bool.isRequired,
    toggleNavHandler: PropTypes.func.isRequired,
    initials: PropTypes.string.isRequired,
    homeUrl: PropTypes.string.isRequired
  }

  state = {
    showSearch: false,
    isIconHidden: false
  }

  displaySearchBar = () => {
    this.setState({ showSearch: !this.state.showSearch })
  }

  toggleInnerIcon = () => {
    this.setState({ isIconHidden: !this.state.isIconHidden })
  }

  render() {
    const {
      isDashboard,
      isSideBarShownMobile,
      toggleNavHandler,
      initials,
      homeUrl
    } = this.props
    return (
      <div className="navbar main-navigation" data-test="navbar">
        <div
          className={`mobile-menu-toggle ${
            isSideBarShownMobile ? 'cross' : 'hamburger'
          }`}
          onClick={toggleNavHandler}
        />

        <Link to={homeUrl}>
          <div
            className={`mobile-navigation-logo ${
              isSideBarShownMobile ? 'show' : ''
            }`}
          />
        </Link>

        <div
          className={`left ${isSideBarShownMobile ? 'hide' : ''} ${
            this.state.showSearch ? 'hide-search' : ''
          }`}
        >
          <Link className="navigation-logo" to={homeUrl} />

          {isDashboard ? (
            <div className="dashboard-buttons-wrapper">
              <Link className="on-dashboard" to={homeUrl} />

              {!isProduction() ? (
                <Link className="go-to-market" to={'/app/market'} />
              ) : null}

              <Link className="responsive-on dashboard" to={homeUrl} />
              <Link className="responsive-go to-market" to={'/app/market'} />
            </div>
          ) : (
            <div className="market-buttons-wrapper">
              <Link className="on-market" to={'/app/market'} />
              <Link className="go-to-dashboard" to={homeUrl} />
              <Link className="responsive-on market" to={'/app/market'} />
              <Link className="responsive-go to-dashboard" to={homeUrl} />
            </div>
          )}
        </div>
        <div className={`right ${isSideBarShownMobile ? 'hide' : ''}`}>
          <div
            className={`search-icon ${this.state.showSearch ? '' : 'show'}`}
            onClick={this.displaySearchBar}
          />
          <div className={`search ${this.state.showSearch ? 'show' : ''}`}>
            <input
              type="text"
              placeholder="Search"
              onFocus={this.toggleInnerIcon}
              onBlur={this.toggleInnerIcon}
              disabled={isProduction()}
            />
            <div
              className={`inner-search-icon ${
                this.state.isIconHidden ? 'hide' : ''
              }`}
            />
            <div className="close-search" onClick={this.displaySearchBar} />
          </div>
          <div
            className={`notifications ${
              this.state.showSearch ? 'hide-search' : ''
            } ${isProduction() ? 'dimmed' : ''}`}
          />
          <div className={this.state.showSearch ? 'hide-search' : ''}>
            <DropDown
              type="simple"
              className="direction-left"
              dropdownClass="user-avatar uppercase"
              dropdownText={initials}
            >
              <button type="button" onClick={this.props.logout}>
                Logout
              </button>
            </DropDown>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
