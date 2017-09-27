import { connect } from 'react-redux'
import KintoAppCard from '../../../../components/dashboard/kintoApps/kintoAppsList/KintoAppCard'

import { getVersionSelectItem } from '../../../../helpers/versionHelper'

function mapStateToProps(state, { kintoApp, index }) {
  const latestVersion = kintoApp.versions[0]
  const versions = kintoApp.versions.map(v => {
    const isFirst = kintoApp.versions.indexOf(v) === 0
    let result = getVersionSelectItem(v, kintoApp.id)
    if (isFirst) {
      result.active = true
    }
    return result
  })
  return {
    kintoApp,
    versions,
    latestVersion: versions[0],
    isLatestVersionPending: latestVersion.state === 'PENDING',
    dropdownId: `id-${index}`,
    dropdownVersionId: `idv-${index}`,
    dropdownDependencyId: `idd-${index}`
  }
}

export default connect(mapStateToProps)(KintoAppCard)
