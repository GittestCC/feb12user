import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ComplexModal from '../../dashboard/ui/ComplexModal'
import { Button } from '../../forms'
import { getPageUrl } from '../../../helpers/urlHelper'
import { scrollToError } from '../../../helpers/domHelper'
import { getVersionType } from '../../../helpers/versionHelper'
import { pages } from '../../../constants/pages'
import KintoBlockManageFormContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageFormContainer'
import KintoBlockCreateTagModalContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockCreateTagModalContainer'
import SaveBarPortal from '../../ui/SaveBarPortal'

class KintoBlockManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ver: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    kintoBlock: PropTypes.object.isRequired,
    canTagCommit: PropTypes.bool,
    isVersionMatch: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchKintoBlock: PropTypes.func.isRequired,
    hasActiveBuild: PropTypes.bool.isRequired,
    selectedWorkspace: PropTypes.string.isRequired
  }

  state = {
    isModalOpen: false,
    isCreateTagErrorMessageShown: false
  }

  componentDidMount() {
    const {
      id,
      ver,
      type,
      fetchKintoBlock,
      hasActiveBuild,
      showNotification
    } = this.props
    fetchKintoBlock(id, ver, type)
    if (!hasActiveBuild) {
      showNotification(
        'Kudos for creating a KintoBlock - head over to Github and start coding!'
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, ver, type, canSave } = nextProps
    if (
      this.props.ver !== ver ||
      this.props.id !== id ||
      this.props.type !== type
    ) {
      this.props.resetForm()
      this.props.fetchKintoBlock(id, ver, type)
      this.setState({ isCreateTagErrorMessageShown: false })
    }
    if (
      !this.props.canSave &&
      canSave &&
      this.state.isCreateTagErrorMessageShown
    ) {
      this.setState({ isCreateTagErrorMessageShown: false })
    }
  }

  onModalClose = () => {
    this.setState({ isModalOpen: false })
  }

  onModalOpen = () => {
    if (this.props.hasActiveBuild) {
      this.setState({ isModalOpen: true })
    } else {
      this.setState({ isCreateTagErrorMessageShown: true }, () => {
        scrollToError()
      })
    }
  }

  render() {
    const {
      kintoBlock,
      isVersionMatch,
      canTagCommit,
      selectedWorkspace
    } = this.props
    const { isCreateTagErrorMessageShown } = this.state
    if (!isVersionMatch) {
      return null
    }
    return (
      <div className="kintoblock-manage">
        <div className="page-title">
          <h2>
            <span data-test="title">
              {kintoBlock.name} - {kintoBlock.version.name}
            </span>
          </h2>
          <Link
            to={getPageUrl(
              pages.dashboardDocumentation,
              {
                workspaceId: selectedWorkspace,
                id: kintoBlock.id,
                version: kintoBlock.version.name,
                type: getVersionType(kintoBlock.version)
              },
              null,
              true
            )}
            className="button dark"
          >
            View Endpoints
          </Link>
        </div>

        <KintoBlockManageFormContainer
          kintoBlock={kintoBlock}
          isCreateTagErrorMessageShown={isCreateTagErrorMessageShown}
        />

        <ComplexModal
          component={KintoBlockCreateTagModalContainer}
          isOpen={this.state.isModalOpen}
          onClose={this.onModalClose}
          data={{
            kintoBlock
          }}
        />

        <SaveBarPortal>
          {canTagCommit && (
            <Button
              data-test="create-tag-button"
              type="button"
              onClick={this.onModalOpen}
            >
              Tag Latest Commit
            </Button>
          )}
        </SaveBarPortal>
      </div>
    )
  }
}

export default KintoBlockManage
