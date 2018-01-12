import React, { Component } from 'react'
import LogsRow from './kintoAppLogs/LogsRow'

class KintoAppLogs extends Component {
  componentDidMount() {
    this.props.fetchKintoApps()
    this.props.getKintoAppEnvironments(this.props.id)
    this.props.getEnvironmentLogs(
      this.props.id,
      this.props.envId,
      this.props.releaseVersion
    )
  }

  render() {
    const { logs, environment, releaseVersion } = this.props

    if (!logs) return null

    let status = ''
    let currentRelease = {}
    let currentStep

    if (environment.releases) {
      currentRelease = environment.releases[environment.releases.length - 1]
      currentStep = currentRelease.steps[currentRelease.steps.length - 1]
      status = currentStep.state
    }

    return (
      <div className="logs">
        <h2 className="logs-title">
          {environment.name} - {releaseVersion} -{' '}
          <h6 className={`status ${status.toLowerCase()}`}>{status}</h6>
        </h2>
        <ul className="title unstyled-list">
          <li className="column one">
            <h5>severity</h5>
          </li>
          <li className="column two">
            <h5>response code</h5>
          </li>
          <li className="column three">
            <h5>kintoblock</h5>
          </li>
          <li className="column four">
            <h5>versions</h5>
          </li>
          <li className="column five">
            <h5>time & date</h5>
          </li>
        </ul>
        <ul className="unstyled-list container">
          {logs.map((row, i) => (
            <li key={i}>
              <LogsRow row={row} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default KintoAppLogs
