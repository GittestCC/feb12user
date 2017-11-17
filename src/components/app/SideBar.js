import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SideBar extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    isSideBarShownMobile: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired
  }

  navigateTo = (e, url) => {
    e.preventDefault()
    this.props.navigateTo(url)
  }

  render() {
    return (
      <div
        className={`sidebar ${this.props.isSideBarShownMobile ? 'show' : ''}`}
      >
        <div className="workspaces-select">
          <h3 className="uppercase">Workspace</h3>
        </div>
        <ul className="unstyled-list sidebar-list">
          {this.props.list.map((groupItems, key) => (
            <li className="sidebar-section" key={key}>
              <ul className="sidebar-inner unstyled-list">
                {groupItems.map((item, key) => (
                  <li
                    className={`sidebar-item ${item.active ? 'selected' : ''}`}
                    key={key}
                  >
                    <Link to={item.url}>
                      <h4 className={item.className}>
                        {item.title}
                        {item.addUrl && (
                          <img
                            className="item-sub-add"
                            src={`${process.env
                              .PUBLIC_URL}/images/dashboard/icon-blue-new.svg`}
                            alt=""
                            onClick={e => this.navigateTo(e, item.addUrl)}
                          />
                        )}
                      </h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SideBar
