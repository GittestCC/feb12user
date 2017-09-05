import React, { Component } from 'react'
import NavBar from './ui/NavBar'
import SideBar from './ui/SideBar'

class Layout extends Component {
  state = {
    isSideBarShownMobile: false
  }

  toggleNav = () => {
    this.setState({ isSideBarShownMobile: !this.state.isSideBarShownMobile })
  }

  render() {
    return (
      <div>
        <NavBar
          isSideBarShownMobile={this.state.isSideBarShownMobile}
          toggleNavHandler={this.toggleNav}
          isDashboard={false}
        />

        <SideBar isSideBarShownMobile={this.state.isSideBarShownMobile} />

        <div className="layout-inner" />
      </div>
    )
  }
}

export default Layout
