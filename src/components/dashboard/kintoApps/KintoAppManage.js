import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../forms'
import { isProduction } from '../../../helpers/pageHelper'
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
    fetchKintoApp: PropTypes.func.isRequired,
    isDraft: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    goToChangelog: PropTypes.func.isRequired,
    goToEnvironment: PropTypes.func.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
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
    const {
      kintoApp,
      canSave,
      version,
      isDraft,
      isVersionMatch,
      goToChangelog,
      goToEnvironment,
      hasDependencies
    } = this.props
    if (!isVersionMatch) {
      return null
    }
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
          <div className="buttons">
            {!isProduction() ? (
              <button
                className="button secondary"
                onClick={goToChangelog}
                type="button"
              >
                Compare Versions
              </button>
            ) : null}

            <button
              className="button dark"
              onClick={goToEnvironment}
              type="button"
            >
              View Environments
            </button>
          </div>
        </div>

        <KintoAppFormContainer
          kintoApp={kintoApp}
          version={this.props.ver}
          isCreate={false}
          isDraft={isDraft}
        />

        <ComplexModal
          className="tag-and-deploy-modal"
          component={KintoAppTagAndDeployFormContainer}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          data={{
            id: kintoApp.id,
            title: kintoApp.name,
            environments: kintoApp.environments,
            isDraft: isDraft,
            kintoApp: kintoApp
          }}
        />

        {!canSave && (
          <SaveBarPortal>
            <Button
              type="button"
              onClick={this.onVersionModalOpen}
              className="button default tag-deploy"
              disabled={!hasDependencies}
            >
              {isDraft ? 'Tag and Deploy' : 'Deploy'}
            </Button>
          </SaveBarPortal>
        )}
      </div>
    )
  }
}

export default KintoAppManage
