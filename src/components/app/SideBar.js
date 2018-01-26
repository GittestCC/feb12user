import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import MemberListCircles from '../ui/MemberListCircles'

class SideBar extends Component {
  static propTypes = {
    isSideBarShownMobile: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    workspaces: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    selectedWorkspaceId: PropTypes.string,
    selectedWorkspaceMembers: PropTypes.array.isRequired,
    isCurrentUserAdmin: PropTypes.bool.isRequired
  }

  navigateTo = (e, url) => {
    e.preventDefault()
    this.props.push(url)
  }

  goToWorkspace = e => {
    this.props.selectWorkspace(e.target.value)
  }

  goToEditWorkspace = () => {
    this.props.push(
      getPageUrl(pages.workspaceEdit, { id: this.props.selectedWorkspaceId })
    )
  }

  render() {
    const {
      isSideBarShownMobile,
      selectedWorkspaceId,
      selectedWorkspaceMembers,
      workspaces,
      list,
      isCurrentUserAdmin
    } = this.props

    return (
      <div
        className={`sidebar ${isSideBarShownMobile ? 'show' : ''}`}
        data-test="sidebar"
      >
        <div className="workspaces-select" data-test={selectedWorkspaceId}>
          <h3 className="uppercase">Workspace</h3>
          <select
            onChange={this.goToWorkspace}
            value={selectedWorkspaceId || ''}
          >
            {workspaces.map((workspace, index) => (
              <option key={index} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
          <MemberListCircles
            users={selectedWorkspaceMembers}
            editAction={this.goToEditWorkspace}
            canEdit={isCurrentUserAdmin}
            numberOfItemsShown={6}
            size="small"
          />
        </div>
        <ul className="unstyled-list sidebar-list">
          {list.map((groupItems, key) => (
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
                            src={`${
                              process.env.PUBLIC_URL
                            }/images/icon-blue-new.svg`}
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
