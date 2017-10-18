import React from 'react'
import moment from 'moment'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { getEnvironmentVersionAndBuild } from '../../../../helpers/environmentHelper'
import DropDown from '../../../ui/DropDown'

const DragHandle = SortableHandle(() => <span className="hamburger" />)

const KintoAppEnvironmentCard = SortableElement(
  ({
    environment,
    kintoApp,
    getLatestEnvironmentRelease,
    index,
    buttonAction
  }) => {
    let status = ''
    let currentRelease = {}
    let version = ''
    let build = ''
    let date = ''

    if (environment.releases) {
      currentRelease = environment.releases[environment.releases.length - 1]
      status = currentRelease.state
      version = getEnvironmentVersionAndBuild(currentRelease.version).version
      build = getEnvironmentVersionAndBuild(currentRelease.version).build
      date = moment(currentRelease.completionTime).format('Do MMMM[,] YYYY')
    }

    const getButton = status => {
      if (!status) {
        return (
          <button
            className={`button`}
            onClick={() => buttonAction('new', 'deploy', 'Deploy', environment)}
          >
            Deploy
          </button>
        )
      }

      status = status.toLowerCase()

      switch (status) {
        case 'failed':
        case 'success':
          return (
            <button
              className="button default"
              onClick={() =>
                buttonAction(
                  status,
                  'deploy',
                  'Deploy Another Version',
                  environment
                )}
            >
              Deploy Another Version
            </button>
          )
        case 'shutdown':
          return (
            <button
              className="button default"
              onClick={() =>
                buttonAction(status, 'deploy', 'Deploy', environment)}
            >
              Deploy
            </button>
          )
        case 'testing':
          return (
            <button
              className="button dark"
              onClick={() =>
                buttonAction(status, 'testing', 'Cancel Deployment')}
            >
              Cancel Deployment
            </button>
          )
        default:
          return (
            <button
              className="button default"
              onClick={() => buttonAction(status, 'deploy', 'Deploy')}
            >
              Deploy
            </button>
          )
      }
    }

    return (
      <div className="environment-card">
        <div className="top">
          <h3>
            <DragHandle />
            {environment.name}
          </h3>
          <div className="expand">
            <h6>Expand</h6>
            <span className="chevron" />
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="upper">
              {environment.releases ? status === 'SHUTDOWN' ? (
                <div>
                  <h4> No build deployed. </h4>
                </div>
              ) : (
                <div>
                  <h6 className={`status ${status.toLowerCase()}`}>{status}</h6>
                  <h4 className="version">{`${version} (${build})`}</h4>
                </div>
              ) : (
                <h4> No build deployed. </h4>
              )}
            </div>
            <div className="lower">
              <div className="date">
                {environment.releases ? status === 'SHUTDOWN' ? (
                  <div className="date">Shut down at {date}</div>
                ) : (
                  date
                ) : (
                  <div>Click the blue “Deploy” button to choose a build.</div>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <button className="button secondary">Edit</button>
            {getButton(status)}
            <DropDown type="simple" dropdownClass="menu" id={`id-${index}`}>
              <button>Shut Down</button>
              <button>Edit Environment</button>
              <button>Move to Top</button>
              <div className="dropdown line" />
              <button>Delete Environment</button>
            </DropDown>
          </div>
        </div>
      </div>
    )
  }
)

export default KintoAppEnvironmentCard
