import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SideBar extends Component {
  navigateTo = (e, url) => {
    e.preventDefault()
    this.props.navigateTo(url)
  }

  render() {
    return (
      <div
        className={`sidebar ${this.props.isSideBarShownMobile ? 'show' : ''}`}
      >
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
