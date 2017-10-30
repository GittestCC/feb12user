import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../ui/DropDown'
import PropTypes from 'prop-types'

class NavBar extends Component {
  static propTypes = {
    isDashboard: PropTypes.bool.isRequired,
    isSideBarShownMobile: PropTypes.bool.isRequired,
    toggleNavHandler: PropTypes.func.isRequired,
    initials: PropTypes.string.isRequired
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
      initials
    } = this.props
    return (
      <div className="navbar main-navigation">
        <div
          className={`mobile-menu-toggle ${isSideBarShownMobile
            ? 'cross'
            : 'hamburger'}`}
          onClick={toggleNavHandler}
        />

        <Link to={'/'}>
          <div
            className={`mobile-navigation-logo ${isSideBarShownMobile
              ? 'show'
              : ''}`}
          />
        </Link>

        <div
          className={`left ${isSideBarShownMobile ? 'hide' : ''} ${this.state
            .showSearch
            ? 'hide-search'
            : ''}`}
        >
          <Link className="navigation-logo" to={'/'} />

          {isDashboard ? (
            <div className="dashboard-buttons-wrapper">
              <Link className="on-dashboard" to={'/app/dashboard'} />
              <Link className="go-to-market" to={'/app/market'} />
              <Link className="responsive-on dashboard" to={'/app/dashboard'} />
              <Link className="responsive-go to-market" to={'/app/market'} />
            </div>
          ) : (
            <div className="market-buttons-wrapper">
              <Link className="on-market" to={'/app/market'} />
              <Link className="go-to-dashboard" to={'/app/dashboard'} />
              <Link className="responsive-on market" to={'/app/market'} />
              <Link
                className="responsive-go to-dashboard"
                to={'/app/dashboard'}
              />
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
            />
            <div
              className={`inner-search-icon ${this.state.isIconHidden
                ? 'hide'
                : ''}`}
            />
            <div className="close-search" onClick={this.displaySearchBar} />
          </div>
          <div
            className={`notifications ${this.state.showSearch
              ? 'hide-search'
              : ''}`}
          />
          <div className={this.state.showSearch ? 'hide-search' : ''}>
            <DropDown
              type="simple"
              className="direction-left"
              dropdownClass="user-avatar uppercase"
              dropdownText={initials}
            >
              <button onClick={this.props.logout}>Logout</button>
            </DropDown>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
