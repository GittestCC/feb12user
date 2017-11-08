import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import { getVersionAsText } from '../../../helpers/versionHelper'
import KintoAppEnvironmentCard from './kintoAppEnvironmentsList/KintoAppEnvironmentCard'
import {
  AddNewEnvironmentModalForm,
  DeployModalForm,
  CancelDeploymentForm,
  ShutDown
} from './kintoAppEnvironmentsList/environmentModals'
import ComplexModal from '../../dashboard/ui/ComplexModal'
import { SortableContainer } from 'react-sortable-hoc'

const SortableList = SortableContainer(
  ({ environments, buttonAction, sortIndex, kintoApp }) => {
    return (
      <div className="environments-list">
        {environments.map((environment, index) => (
          <KintoAppEnvironmentCard
            environment={environment}
            kintoApp={kintoApp}
            key={`card-${index}`}
            index={index}
            sortIndex={index}
            buttonAction={buttonAction}
          />
        ))}
      </div>
    )
  }
)

const getEnvironmentModal = modalType => {
  switch (modalType) {
    case 'add':
      return AddNewEnvironmentModalForm
    case 'deploy':
    case 'new':
      return DeployModalForm
    case 'testing':
      return CancelDeploymentForm
    case 'shutDown':
      return ShutDown
    default:
      return () => 'There is no modal of this type'
  }
}

class KintoAppEnvironmentsList extends Component {
  static propTypes = {
    fetchKintoApps: PropTypes.func.isRequired,
    getKintoAppEnvironments: PropTypes.func.isRequired,
    goToCreatePage: PropTypes.func.isRequired,
    reorderEnvironments: PropTypes.func.isRequired,
    addNewEnvironment: PropTypes.func.isRequired,
    deployEnvironment: PropTypes.func.isRequired,
    cancelDeployment: PropTypes.func.isRequired,
    kintoApps: PropTypes.array.isRequired,
    kintoApp: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    environments: PropTypes.array.isRequired,
    breadcrumbSelectItems: PropTypes.array.isRequired
  }

  state = {
    isModalOpen: false,
    modalType: '',
    title: '',
    environment: {}
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

  onModalOpen = (type, title) => {
    this.setState({
      modalType: type,
      title: title,
      isModalOpen: true
    })
  }

  onModalClose = () => {
    this.setState({ isModalOpen: false })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderEnvironments(this.props.id, oldIndex, newIndex)
  }

  onCardButtonClick = (action, modalType, title, environment) => {
    this.setState({
      isModalOpen: true,
      modalType: modalType,
      environment: environment
    })
  }

  render() {
    const {
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
          <button
            onClick={() => this.onModalOpen('add', 'Add New Environment')}
            className="button secondary"
          >
            Add New Environment
          </button>
        </div>
        <h5>Drag to reorder</h5>

        <SortableList
          environments={environments}
          onSortEnd={this.onSortEnd}
          buttonAction={this.onCardButtonClick}
          kintoApp={kintoApp}
          useDragHandle={true}
        />

        <ComplexModal
          className="string"
          component={getEnvironmentModal(this.state.modalType)}
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          data={{
            environment: this.state.environment,
            kintoApp: kintoApp
          }}
          actions={{
            addNewEnvironment: this.props.addNewEnvironment,
            deployEnvironment: this.props.deployEnvironment,
            cancelDeployment: this.props.cancelDeployment
          }}
        />
      </div>
    )
  }
}

export default KintoAppEnvironmentsList
