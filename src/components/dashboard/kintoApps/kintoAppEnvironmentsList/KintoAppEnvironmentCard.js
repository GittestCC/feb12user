import React, { Component } from 'react'
import moment from 'moment'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { getEnvironmentVersionAndBuild } from '../../../../helpers/environmentHelper'
import DropDown from '../../../ui/DropDown'

const DragHandle = SortableHandle(() => <span className="hamburger" />)

class KintoAppEnvironmentCard extends Component {
  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState(function(prevState, props) {
      return { isExpanded: !prevState.isExpanded }
    })
  }

  render() {
    const { environment, sortIndex, buttonAction } = this.props

    let status = ''
    let currentRelease = {}
    let currentStep

    if (environment.releases) {
      currentRelease = environment.releases[environment.releases.length - 1]
      currentStep = currentRelease.steps[currentRelease.steps.length - 1]
      status = currentStep.state
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
      <div
        className={`environment-card ${this.state.isExpanded
          ? 'expanded'
          : ''}`}
      >
        <div className="top">
          <h3>
            <DragHandle />
            {environment.name}
          </h3>
          {environment.releases && (
            <div onClick={this.toggleExpand} className="expand">
              <h6>Expand</h6>
              <span className="chevron" />
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="left">
            {!this.state.isExpanded ? (
              <div>
                {' '}
                <div className="upper">
                  {environment.releases ? status === 'SHUTDOWN' ? (
                    <div>
                      <h4> No build deployed. </h4>
                    </div>
                  ) : (
                    <div>
                      <h6 className={`status ${status.toLowerCase()}`}>
                        {status}
                      </h6>
                      <h4 className="version">{`${getEnvironmentVersionAndBuild(
                        currentRelease.version
                      ).version} (${getEnvironmentVersionAndBuild(
                        currentRelease.version
                      ).build})`}</h4>
                    </div>
                  ) : (
                    <h4> No build deployed. </h4>
                  )}
                </div>
                <div className="lower">
                  <div className="date">
                    {environment.releases ? status === 'SHUTDOWN' ? (
                      <div className="date">
                        Shut down at{' '}
                        {moment(currentRelease.completionTime).format(
                          'hh:mm [on the] Do MMMM[,] YYYY'
                        )}
                      </div>
                    ) : (
                      moment(currentRelease.completionTime).format(
                        'Do MMMM[,] YYYY, hh:mm'
                      )
                    ) : (
                      <div>
                        Click the blue “Deploy” button to choose a build.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="expanded">
                <div className="upper">
                  {environment.releases &&
                    environment.releases
                      .slice(0)
                      .reverse()
                      .map((release, index) => (
                        <div className="repeat" key={index}>
                          <div className="circle" />
                          {release.state === 'SHUTDOWN' ? (
                            <div className="status-and-build">
                              <div className="left no-build">
                                <h4> No build deployed. </h4>
                                <div className="date">
                                  Shut down at{' '}
                                  {moment(release.completionTime).format(
                                    'hh:mm [on the] Do MMMM[,] YYYY'
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="status-and-build">
                              <div className="left">
                                <h6
                                  className={`status ${environment.releases[
                                    environment.releases.length - 1
                                  ].steps[
                                    environment.releases[
                                      environment.releases.length - 1
                                    ].steps.length - 1
                                  ].state.toLowerCase()}`}
                                >
                                  {currentStep.state}
                                </h6>
                              </div>
                              <div className="right">
                                <h4 className="version">{`${getEnvironmentVersionAndBuild(
                                  release.version
                                ).version} (${getEnvironmentVersionAndBuild(
                                  release.version
                                ).build})`}</h4>
                                <div className="date">
                                  {release.steps ? (
                                    moment(
                                      release.steps[release.steps.length - 1]
                                        .completionTime
                                    ).format('Do MMMM[,] YYYY, hh:mm')
                                  ) : (
                                    <div>
                                      Click the blue “Deploy” button to choose a
                                      build.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {release.steps &&
                            release.steps
                              .slice(0)
                              .reverse()
                              .map((step, index) => (
                                <div key={index} className="step">
                                  <div className="left">
                                    <h6
                                      className={`${step.state &&
                                        step.state.toLowerCase()}`}
                                    >
                                      {step.stepName}ING
                                    </h6>
                                  </div>
                                  <div className="right">
                                    <div className="date">
                                      {moment(step.completionTime).format(
                                        'Do MMMM[,] YYYY, hh:mm'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}

                          {release.version !==
                            environment.releases[
                              environment.releases.length - 1
                            ].version && (
                            <div className="release-button">
                              <button
                                className={`button secondary ${release.steps[
                                  release.steps.length - 1
                                ].state === 'FAILED' && 'disabled'}`}
                              >
                                Rollback to this Build{' '}
                              </button>
                            </div>
                          )}
                          <div className="view">
                            <div className="changelog">
                              <a href="/">View Changelog</a>
                            </div>
                            <div className="logs">
                              <a href="/">View Logs</a>
                            </div>
                          </div>
                        </div>
                      ))}

                  {!environment.releases && (
                    <div className="no-releases">
                      <div>
                        <h4> No build deployed. </h4>
                      </div>
                      <div className="date">
                        <div>
                          Click the blue “Deploy” button to choose a build.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right expanded-buttons">
            <button className="button secondary">Edit</button>
            {getButton(status)}
            <DropDown type="simple" dropdownClass="menu" id={`id-${sortIndex}`}>
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
}

export default SortableElement(KintoAppEnvironmentCard)
