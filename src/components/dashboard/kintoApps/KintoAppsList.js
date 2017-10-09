import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { asTextList } from '../../../helpers/versionHelper'
import VersionCreateModalContainer from '../../../containers/dashboard/ui/VersionCreateModalContainer'
import KintoAppCardContainer from '../../../containers/dashboard/kintoApps/kintoAppsList/KintoAppCardContainer'

class KintoAppsList extends Component {
  state = {
    isVersionModalOpen: false,
    versionKintoAppId: null,
    versionKintoAppName: null,
    versionBaseVersionsList: []
  }

  onVersionModalOpen = kintoApp => {
    this.setState({
      isVersionModalOpen: true,
      versionKintoAppId: kintoApp.id,
      versionKintoAppName: kintoApp.name,
      versionBaseVersionsList: asTextList(kintoApp.versions)
    })
  }

  onVersionModalClose = () => {
    this.setState({
      isVersionModalOpen: false,
      versionKintoAppId: null,
      versionKintoAppName: null,
      versionBaseVersionsList: []
    })
  }

  componentDidMount() {
    this.props.fetchKintoApps()
  }

  render() {
    const {
      isVersionModalOpen,
      versionKintoAppId,
      versionKintoAppName,
      versionBaseVersionsList
    } = this.state
    return (
      <div className="my-kintoapps">
        <div className="breadcrumbs">
          <a href="list" className="disabled">
            KintoApps
          </a>
        </div>

        <div className="page-title">
          <h2>My Applications</h2>
          <Link to="create" className="button default">
            Create New Application
          </Link>
        </div>

        <div className="kintoapp-list">
          <Link to="create" className="kintoapp create">
            <div className="text">
              <img src="/images/icon-generic-application.svg" alt="" />
              <h3>Create New KintoApp</h3>
            </div>
            <div className="icons">
              <div className="applications">
                <div className="dependency application" />
                <div className="dependency kintoblock-dep" />
              </div>
              <div className="add-new">
                <div className="inner" />
                <div className="pulsate" />
              </div>
            </div>
          </Link>
          {this.props.kintoApps.map((kintoApp, i) => (
            <KintoAppCardContainer
              kintoApp={kintoApp}
              key={i}
              index={i}
              onVersionCreate={this.onVersionModalOpen}
            />
          ))}
        </div>
        <VersionCreateModalContainer
          id={versionKintoAppId}
          title={versionKintoAppName}
          baseVersions={versionBaseVersionsList}
          isOpen={isVersionModalOpen}
          onClose={this.onVersionModalClose}
          disableCloseOnSubmit={true}
        />
      </div>
    )
  }
}

export default KintoAppsList
