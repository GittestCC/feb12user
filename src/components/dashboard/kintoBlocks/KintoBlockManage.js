import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getVersionStateClassName } from '../../../helpers/versionHelper'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoBlockManageFormContainer from '../../../containers/dashboard/kintoBlocks/kintoBlockManage/KintoBlockManageFormContainer'

class KintoBlockManage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    kintoBlock: PropTypes.object.isRequired,
    ver: PropTypes.string.isRequired,
    version: PropTypes.object,
    baseVersions: PropTypes.array.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchKintoBlocks: PropTypes.func.isRequired,
    fetchKintoBlock: PropTypes.func.isRequired
  }

  state = {
    isVersionModalOpen: false
  }

  componentDidMount() {
    this.props.fetchKintoBlocks().then(() => {
      this.props.fetchKintoBlock(this.props.id, this.props.ver)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { id, ver } = nextProps
    if (this.props.ver !== ver || this.props.id !== id) {
      this.props.resetForm()
      this.props.fetchKintoBlock(id, ver)
    }
  }

  onVersionModalClose = () => {
    this.setState({ isVersionModalOpen: false })
  }

  onVersionModalOpen = () => {
    this.setState({ isVersionModalOpen: true })
  }

  render() {
    const { kintoBlock, ver, version, baseVersions } = this.props
    return (
      <div className="kintoblock-manage">
        <div className="page-title">
          <h2>
            {kintoBlock.name}
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

        <KintoBlockManageFormContainer kintoBlock={kintoBlock} ver={ver} />

        <VersionCreateModalContainer
          id={kintoBlock.id}
          title={kintoBlock.name}
          baseVersions={baseVersions}
          isOpen={this.state.isVersionModalOpen}
          onClose={this.onVersionModalClose}
          isKintoBlock={true}
        />
      </div>
    )
  }
}

export default KintoBlockManage
