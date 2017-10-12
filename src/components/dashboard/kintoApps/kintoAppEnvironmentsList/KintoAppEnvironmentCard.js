import React from 'react'
import moment from 'moment'
import {
  getVersionAsText,
  isVersionEqual
} from '../../../../helpers/versionHelper'
import {
  getEnvironmentButtonClass,
  getEnvironmentButtonText,
  getEnvironmentVersionAndBuild
} from '../../../../helpers/environmentHelper'

const KintoAppEnvironmentCard = ({
  environment,
  getLatestEnvironmentRelease
}) => {
  let status = ''
  let currentRelease = {}
  let version = ''
  let build = ''
  let date = ''

  if (environment.releases) {
    status = environment.releases[0].state
    currentRelease = environment.releases[0]
    version = getEnvironmentVersionAndBuild(currentRelease.version).version
    build = getEnvironmentVersionAndBuild(currentRelease.version).build
    date = moment(currentRelease.completionTime).format('Do MMMM[,] YYYY')
  }

  return (
    <div className="environment-card">
      <div className="top">
        <h3>
          <span className="hamburger" />
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
            {environment.releases ? (
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
              {environment.releases ? (
                date
              ) : (
                <div>Click the blue “Deploy” button to choose a build.</div>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <button className="button secondary">Edit</button>
          <button className={`button ${getEnvironmentButtonClass(status)}`}>
            {getEnvironmentButtonText(status)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default KintoAppEnvironmentCard
