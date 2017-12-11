import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getVersionStateClassName } from '../../../helpers/versionHelper'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoAppFormContainer from '../../../containers/dashboard/kintoApps/KintoAppFormContainer'
import SaveBarPortal from '../../../components/ui/SaveBarPortal'

class KintoAppManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ver: PropTypes.string.isRequired,
    version: PropTypes.object,
    kintoApp: PropTypes.object.isRequired,
    baseVersions: PropTypes.array.isRequired,
    fetchKintoApps: PropTypes.func.isRequired,
    fetchKintoApp: PropTypes.func.isRequired,
    getKintoAppEnvironments: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoApps()
    this.props.fetchKintoApp(this.props.id, this.props.ver)
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
    const { kintoApp, version, baseVersions } = this.props
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
          <button
            onClick={this.onVersionModalOpen}
            type="button"
            className="button secondary"
          >
            Create New Version
          </button>
        </div>

        <KintoAppFormContainer
          kintoApp={kintoApp}
          version={this.props.ver}
          isCreate={false}
        />

        <VersionCreateModalContainer
          id={kintoApp.id}
          title={kintoApp.name}
          baseVersions={baseVersions}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
        />
        <SaveBarPortal>
          <button className="button default tag-deploy">Tag and Deploy</button>
        </SaveBarPortal>
      </div>
    )
  }
}

export default KintoAppManage
