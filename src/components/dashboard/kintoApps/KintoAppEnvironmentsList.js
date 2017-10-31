import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../../ui/DropDown'
import TagItem from '../ui/TagItem'
import { getVersionAsText } from '../../../helpers/versionHelper'
import KintoAppEnvironmentCard from './kintoAppEnvironmentsList/KintoAppEnvironmentCard'
import KintoAppEnvironmentListModalContainer from '../../../containers/dashboard/ui/KintoAppEnvironmentListModalContainer'
import { SortableContainer } from 'react-sortable-hoc'

const SortableList = SortableContainer(
  ({ environments, buttonAction, sortIndex }) => {
    return (
      <div className="environments-list">
        {environments.map((environment, index) => (
          <KintoAppEnvironmentCard
            environment={environment}
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

class KintoAppEnvironmentsList extends Component {
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
          useDragHandle={true}
        />

        <KintoAppEnvironmentListModalContainer
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          modalType={this.state.modalType}
          environment={this.state.environment}
          kintoApp={kintoApp}
        />
      </div>
    )
  }
}

export default KintoAppEnvironmentsList
