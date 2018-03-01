import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KintoAppEnvironmentFormContainer from '../../../containers/dashboard/kintoApps/KintoAppEnvironmentFormContainer'

class KintoAppEnvironmentEdit extends Component {
  static propTypes = {
    kintoApp: PropTypes.object.isRequired,
    environment: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.getKintoAppEnvironments(this.props.id)
    this.props.environmentSelect(this.props.envId)
    this.props.kintoAppSelect(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    const { id, envId } = nextProps
    if (this.props.id !== id) {
      this.props.getKintoAppEnvironments(id)
    }
    if (this.props.envId !== envId) {
      this.props.environmentSelect(envId)
    }
  }

  render() {
    const { kintoApp, environment } = this.props
    return (
      <div className="environment-edit-page">
        <div className="page-title">
          <h2>{environment.name}</h2>
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
