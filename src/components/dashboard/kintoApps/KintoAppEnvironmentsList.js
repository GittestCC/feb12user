import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import { getVersionAsText } from '../../../helpers/versionHelper'
import KintoAppEnvironmentCard from './kintoAppEnvironmentsList/KintoAppEnvironmentCard'

class KintoAppEnvironmentsList extends Component {
  state = {
    isCreateModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoApps().then(() => {
      this.props.getKintoAppEnvironments(this.props.id)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    if (this.props.id !== id) {
      this.props.fetchKintoApps().then(() => {
        this.props.getKintoAppEnvironments(this.props.id)
      })
    }
  }

  onCreateModalOpen = () => {
    this.setState({ isCreateModalOpen: true })
  }

  onCreateModalClose = () => {
    this.setState({ isCreateModalOpen: false })
  }

  render() {
    const {
      kintoApps,
      environments,
      kintoApp,
      breadcrumbSelectItems,
      goToCreatePage
    } = this.props
    return (
      <div className="kintoapp-environments-list">
        <div className="breadcrumbs">
          <ul className="unstyled-list">
            <li>
              <Link to="/app/dashboard/kintoapps/list">Applications</Link>
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <Link
                to={`/app/dashboard/kintoapps/${kintoApp.id}/versions/${getVersionAsText(
                  kintoApp.version
                )}`}
              >
                {kintoApp.name}
              </Link>
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="application-dropdown"
                list={breadcrumbSelectItems}
                component={TagItem}
                filterField="text"
                actionText="Create New Application"
                actionHandler={goToCreatePage}
                dropdownContentClass="short"
                className="margin-right"
              />
              <img src="/images/icon-breadcrumb-chevron.svg" alt="" />
            </li>
            <li>
              <h5>Environments</h5>
            </li>
          </ul>
        </div>

        <div className="page-title">
          <h2>Environments</h2>
          <button onClick={this.onCreateModalOpen} className="button secondary">
            Add New Environment
          </button>
        </div>
        <h5>Drag to reorder</h5>

        <div className="environments-list">
          {environments.map((environment, index) => (
            <KintoAppEnvironmentCard environment={environment} key={index} />
          ))}
        </div>
      </div>
    )
  }
}

export default KintoAppEnvironmentsList
