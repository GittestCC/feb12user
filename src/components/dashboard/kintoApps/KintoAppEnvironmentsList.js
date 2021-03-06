import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  ({ environments, buttonAction, sortIndex, kintoApp, selectedWorkspace }) => {
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
            selectedWorkspace={selectedWorkspace}
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
    getKintoAppEnvironments: PropTypes.func.isRequired,
    reorderEnvironments: PropTypes.func.isRequired,
    addNewEnvironment: PropTypes.func.isRequired,
    deployEnvironment: PropTypes.func.isRequired,
    cancelDeployment: PropTypes.func.isRequired,
    shutDownEnvironment: PropTypes.func.isRequired,
    kintoApp: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    environments: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string
  }

  state = {
    isModalOpen: false,
    modalType: '',
    title: '',
    environment: {}
  }

  componentDidMount() {
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
    const { environments, kintoApp, selectedWorkspace } = this.props
    return (
      <div className="kintoapp-environments-list">
        <div className="page-title">
          <h2>{kintoApp.name} - Environments</h2>
          <button
            type="button"
            onClick={() => this.onModalOpen('add', 'Add New Environment')}
            className="button secondary"
          >
            Add New Environment
          </button>
        </div>
        <h5>
          Control your environments for the various deployments of{' '}
          {kintoApp.name}
        </h5>

        <SortableList
          environments={environments}
          onSortEnd={this.onSortEnd}
          buttonAction={this.onCardButtonClick}
          kintoApp={kintoApp}
          useDragHandle={true}
          selectedWorkspace={selectedWorkspace}
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
            cancelDeployment: this.props.cancelDeployment,
            shutDownEnvironment: this.props.shutDownEnvironment
          }}
        />
      </div>
    )
  }
}

export default KintoAppEnvironmentsList
