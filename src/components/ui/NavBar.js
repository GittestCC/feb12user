import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
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
    return (
      <div className="navbar main-navigation">
        <div
          className={`mobile-menu-toggle ${this.props.isSideBarShownMobile
            ? 'cross'
            : 'hamburger'}`}
          onClick={this.props.toggleNavHandler}
        />

        <Link to={'/'}>
          <div
            className={`mobile-navigation-logo ${this.props.isSideBarShownMobile
              ? 'show'
              : ''}`}
          />
        </Link>

        <div
          className={`left ${this.props.isSideBarShownMobile
            ? 'hide'
            : ''} ${this.state.showSearch ? 'hide-search' : ''}`}
        >
          <Link className="navigation-logo" to={'/'} />

          {this.props.isDashboard ? (
            <div className="dashboard-buttons-wrapper">
              <Link className="on-dashboard" to={'/'} />
              <Link className="go-to-market" to={'/'} />
              <div className="responsive-on dashboard" />
              <div className="responsive-go to-market" />
            </div>
          ) : (
            <div className="market-buttons-wrapper">
              <Link className="on-market" to={'/'} />
              <Link className="go-to-dashboard" to={'/'} />
              <div className="responsive-on market" />
              <div className="responsive-go to-dashboard" />
            </div>
          )}
        </div>
        <div
          className={`right ${this.props.isSideBarShownMobile ? 'hide' : ''}`}
        >
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
          <div
            className={`user-avatar ${this.state.showSearch
              ? 'hide-search'
              : ''}`}
          >
            <h3>LA</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
