import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getVersionStateClassName } from '../../../helpers/versionHelper'
import KintoAppFormContainer from '../../../containers/dashboard/kintoApps/KintoAppFormContainer'
import KintoAppTagAndDeployFormContainer from '../../../containers/dashboard/kintoApps/KintoAppTagAndDeployFormContainer'
import SaveBarPortal from '../../../components/ui/SaveBarPortal'
import ComplexModal from '../ui/ComplexModal'

class KintoAppManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ver: PropTypes.string.isRequired,
    canSave: PropTypes.bool.isRequired,
    version: PropTypes.object,
    kintoApp: PropTypes.object.isRequired,
    baseVersions: PropTypes.array.isRequired,
    fetchKintoApps: PropTypes.func.isRequired,
    fetchKintoApp: PropTypes.func.isRequired,
    isTagged: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoApps()
    this.props.fetchKintoApp(this.props.id, this.props.ver)
    this.props.getKintoAppEnvironments(this.props.id) // TODO: Because we will need release information
  }

  componentWillReceiveProps(nextProps) {
    const { id, ver } = nextProps
    if (this.props.ver !== ver || this.props.id !== id) {
      this.props.resetForm()
      this.props.fetchKintoApp(id, ver)
    }
  }

  onVersionModalClose = () => {
    this.setState({ isVersionModalOpen: false })
  }

  onVersionModalOpen = () => {
    this.setState({ isVersionModalOpen: true })
  }

  render() {
    const { kintoApp, version, baseVersions, canSave, isTagged } = this.props
    return (
      <div className="kinto-app-manage">
        <div className="page-title">
          <h2>
            {kintoApp.name}
            <div
              className={`text-highlight status h6 ${getVersionStateClassName(
                version
              )}`}
            >
              {version && version.state}
            </div>
          </h2>
        </div>

        <KintoAppFormContainer
          kintoApp={kintoApp}
          version={this.props.ver}
          isCreate={false}
          isTagged={isTagged}
        />

        <ComplexModal
          className="tag-and-deploy-modal"
          component={KintoAppTagAndDeployFormContainer}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          data={{
            id: kintoApp.id,
            title: kintoApp.name,
            baseVersions: baseVersions,
            environments: kintoApp.environments,
            isTagged: isTagged,
            kintoApp: kintoApp
          }}
        />

        {!canSave && (
          <SaveBarPortal>
            <button
              type="button"
              onClick={this.onVersionModalOpen}
              className="button default tag-deploy"
            >
              {isTagged ? 'Deploy' : 'Tag and Deploy'}
            </button>
          </SaveBarPortal>
        )}
      </div>
    )
  }
}

export default KintoAppManage
