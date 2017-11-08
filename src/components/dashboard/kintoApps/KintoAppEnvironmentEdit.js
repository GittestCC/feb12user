import React, { Component } from 'react'
import startCase from 'lodash/startCase'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import { getVersionAsText } from '../../../helpers/versionHelper'
import KintoAppEnvironmentFormContainer from '../../../containers/dashboard/kintoApps/KintoAppEnvironmentFormContainer'

class KintoAppEnvironmentEdit extends Component {
  static propTypes = {
    kintoApp: PropTypes.object.isRequired,
    environment: PropTypes.object.isRequired,
    kintoAppBreadCrumbSelectItems: PropTypes.array.isRequired,
    environmentBreadCrumbSelectItems: PropTypes.array.isRequired,
    goToCreatePage: PropTypes.func.isRequired,
    goToCreateEnvironmentPage: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchKintoApps()
    this.props.getKintoAppEnvironments(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    if (this.props.id !== id) {
      this.props.getKintoAppEnvironments(id)
    }
  }

  render() {
    const {
      kintoApp,
      environment,
      kintoAppBreadCrumbSelectItems,
      environmentBreadCrumbSelectItems,
      goToCreatePage,
      goToCreateEnvironmentPage
    } = this.props

    const environmentName = startCase(environment.name)

    return (
      <div className="environment-edit-page">
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
                list={kintoAppBreadCrumbSelectItems}
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
              <Link
                to={`/app/dashboard/kintoapps/${kintoApp.id}/versions/${getVersionAsText(
                  kintoApp.version
                )}`}
              >
                {environmentName}
              </Link>
              <DropDown
                type="filter"
                dropdownClass="breadcrumb-icon"
                id="environment-dropdown"
                list={environmentBreadCrumbSelectItems}
                component={TagItem}
                filterField="text"
                actionText="Create New Environment"
                actionHandler={goToCreateEnvironmentPage}
                dropdownContentClass="short"
                className="margin-right"
              />
            </li>
          </ul>
        </div>

        <div className="page-title">
          <h2>{environmentName}</h2>
        </div>

        <KintoAppEnvironmentFormContainer
          kintoApp={kintoApp}
          environment={environment}
          isCreate={false}
        />
      </div>
    )
  }
}

export default KintoAppEnvironmentEdit
