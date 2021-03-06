import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { getEnvironmentButtonInfo } from '../../../../helpers/environmentHelper'
import { isProduction } from '../../../../helpers/pageHelper'
import { getPageUrl } from '../../../../helpers/urlHelper'
import { pages } from '../../../../constants/pages'
import { TAG } from '../../../../constants/version'
import { Button } from '../../../forms'
import {
  deploymentState,
  deploymentStepName
} from '../../../../constants/deploymentStates'
import {
  timeDayMonthYear,
  dateMonthYearTime
} from '../../../../constants/dateFormat'
import DropDown from '../../../ui/DropDown'

const DragHandle = SortableHandle(() => <span className="hamburger" />)

class KintoAppEnvironmentCard extends Component {
  static propTypes = {
    environment: PropTypes.object.isRequired,
    sortIndex: PropTypes.number.isRequired,
    buttonAction: PropTypes.func.isRequired,
    kintoApp: PropTypes.object.isRequired,
    selectedWorkspace: PropTypes.string.isRequired
  }

  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  logsUrl = releaseVersion => {
    const { kintoApp, environment, selectedWorkspace } = this.props
    return getPageUrl(pages.dashboardKintoAppsEnvironmentsLogs, {
      id: kintoApp.id,
      envId: environment.id,
      releaseVersion: releaseVersion.name,
      workspaceId: selectedWorkspace
    })
  }

  getClassForStep = step => {
    switch (step) {
      case deploymentStepName.shutdown:
        return 'shutdown'
      case deploymentStepName.deploy:
        return 'deploying'
      case deploymentStepName.testing:
        return 'testing'
      case deploymentStepName.processing:
        return 'processing'
      case deploymentStepName.success:
        return 'success'
      default:
        throw new Error('step not found')
    }
  }

  render() {
    const {
      environment,
      sortIndex,
      buttonAction,
      kintoApp,
      selectedWorkspace
    } = this.props

    let status = ''
    let currentRelease = {}
    let currentStep

    if (environment.releases) {
      currentRelease = environment.releases[environment.releases.length - 1]
      currentStep = currentRelease.steps[currentRelease.steps.length - 1]
      status = currentStep.state
    }

    const buttonInfo = getEnvironmentButtonInfo(status)

    const editUrl = kintoApp.id
      ? getPageUrl(pages.dashboardKintoAppsEnvironmentEdit, {
          id: kintoApp.id,
          envId: environment.id,
          workspaceId: selectedWorkspace
        })
      : ''

    const hasTags = !isEmpty(kintoApp.versions.filter(v => v.type === TAG))

    const isProd = isProduction()

    return (
      <div
        className={`environment-card ${
          this.state.isExpanded ? 'expanded' : ''
        }`}
      >
        <div className="top">
          <h3>
            {!isProd && <DragHandle />}
            {environment.name}
          </h3>
          {environment.releases && (
            <div onClick={this.toggleExpand} className="expand">
              <h6>{this.state.isExpanded ? 'Collapse' : 'Expand'}</h6>
              <span
                className={`chevron ${this.state.isExpanded ? 'expanded' : ''}`}
              />
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="left">
            {!this.state.isExpanded ? (
              <div>
                {' '}
                <div className="upper">
                  {environment.releases ? (
                    status === 'SHUTDOWN' ? (
                      <div>
                        <h4> No build deployed. </h4>
                      </div>
                    ) : (
                      <div>
                        <h6 className={`status ${status.toLowerCase()}`}>
                          {status}
                        </h6>
                        <h4 className="version">
                          {currentRelease.version &&
                            currentRelease.version.name}
                        </h4>
                      </div>
                    )
                  ) : (
                    <h4> No build deployed. </h4>
                  )}
                </div>
                <div className="lower">
                  <div className="date">
                    {environment.releases ? (
                      status === 'SHUTDOWN' ? (
                        <div className="date">
                          Shut down at{' '}
                          {moment(currentRelease.completionTime).format(
                            timeDayMonthYear
                          )}
                        </div>
                      ) : (
                        moment(currentRelease.completionTime).format(
                          dateMonthYearTime
                        )
                      )
                    ) : (
                      <div>Hit the deploy button to choose a build.</div>
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
                                    timeDayMonthYear
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
                                <h4 className="version">
                                  {release.version && release.version.name}
                                </h4>
                                <div className="date">
                                  {release.steps ? (
                                    moment(
                                      release.steps[release.steps.length - 1]
                                        .completionTime
                                    ).format(dateMonthYearTime)
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
                                        this.getClassForStep(step.state)}`}
                                    >
                                      {step.stepName}
                                      {step.stepName ===
                                      deploymentState.shutdown
                                        ? ''
                                        : 'ING'}
                                    </h6>
                                  </div>
                                  <div className="right">
                                    <div className="date">
                                      {moment(step.completionTime).format(
                                        dateMonthYearTime
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
                                ].state === deploymentState.failed &&
                                  'disabled'}`}
                                onClick={() =>
                                  buttonAction(
                                    'new',
                                    'deploy',
                                    'Deploy',
                                    environment
                                  )
                                }
                              >
                                Rollback to this build{' '}
                              </button>
                            </div>
                          )}
                          <div className="view">
                            {!isProd && (
                              <div className="logs">
                                <Link to={this.logsUrl(release.version)}>
                                  View Logs
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                  {!environment.releases && (
                    <div className="no-releases">
                      <div>
                        <h4> No build deployed. </h4>
                      </div>
                      <div className="date">
                        <div>Hit the deploy button to choose a build.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right expanded-buttons">
            <Link to={editUrl} className="button secondary">
              Edit
            </Link>
            {status ? (
              <button
                className={`button ${buttonInfo.className}`}
                onClick={() => {
                  buttonAction(
                    status.toLowerCase(),
                    buttonInfo.type,
                    buttonInfo.title,
                    environment
                  )
                }}
              >
                {buttonInfo.title}
              </button>
            ) : (
              <Button
                className="button"
                disabled={!hasTags}
                onClick={() =>
                  buttonAction('new', 'deploy', 'Deploy', environment)
                }
              >
                Deploy
              </Button>
            )}

            <DropDown type="simple" dropdownClass="menu" id={`id-${sortIndex}`}>
              {status === deploymentState.success && (
                <button
                  onClick={() =>
                    buttonAction(
                      'shutDown',
                      'shutDown',
                      'ShutDown',
                      environment
                    )
                  }
                >
                  Shut Down
                </button>
              )}
              <Link to={editUrl}>Edit Environment</Link>
              {/* TODO: these are commented as they're not functional yet <button>Move to Top</button> */}
              {/* <div className="dropdown line" /> */}
              {/* <button>Delete Environment</button> */}
            </DropDown>
          </div>
        </div>
      </div>
    )
  }
}

export default SortableElement(KintoAppEnvironmentCard)
