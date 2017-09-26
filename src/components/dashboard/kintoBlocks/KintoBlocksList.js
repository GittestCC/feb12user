import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { asTextList } from '../../../helpers/versionHelper'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoBlockCardContainer from '../../../containers/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCardContainer'

class KintoBlocksList extends Component {
  state = {
    isVersionModalOpen: false,
    versionKintoBlockId: null,
    versionKintoBlockName: null,
    versionBaseVersionsList: []
  }

  componentDidMount() {
    this.props.fetchKintoBlocks()
  }

  onVersionModalClose = () => {
    this.setState({
      isVersionModalOpen: false,
      versionKintoBlockId: null,
      versionKintoBlockName: null,
      versionBaseVersionsList: []
    })
  }

  onVersionModalOpen = kintoBlock => {
    this.setState({
      isVersionModalOpen: true,
      versionKintoBlockId: kintoBlock.id,
      versionKintoBlockName: kintoBlock.name,
      versionBaseVersionsList: asTextList(kintoBlock.versions)
    })
  }

  render() {
    const {
      isVersionModalOpen,
      versionKintoBlockId,
      versionKintoBlockName,
      versionBaseVersionsList
    } = this.state
    return (
      <div className="my-kintoblocks">
        <div className="breadcrumbs">
          <a className="disabled">KintoBlocks</a>
        </div>

        <div className="page-title">
          <h2>My KintoBlocks</h2>
          <Link to="create" className="button default">
            Create New Kintoblock
          </Link>
        </div>

        <div className="kintoblock-list">
          <Link to="create" className="kintoblock create">
            <div className="text">
              <img src="/images/icon-generic-kintoblock.svg" alt="" />
              <h3>Create New KintoBlock</h3>
            </div>
            <div className="icons">
              <div className="applications">
                <div className="application" />
              </div>
              <div className="add-new">
                <div className="inner" />
                <div className="pulsate" />
              </div>
            </div>
          </Link>

          {this.props.kintoBlocks.map((kintoBlock, i) => (
            <KintoBlockCardContainer
              kintoBlock={kintoBlock}
              key={i}
              index={i}
              onVersionCreate={this.onVersionModalOpen}
            />
          ))}
        </div>
        <VersionCreateModalContainer
          id={versionKintoBlockId}
          title={versionKintoBlockName}
          baseVersions={versionBaseVersionsList}
          isOpen={isVersionModalOpen}
          onClose={this.onVersionModalClose}
          disableCloseOnSubmit={true}
        />
      </div>
    )
  }
}

export default KintoBlocksList
