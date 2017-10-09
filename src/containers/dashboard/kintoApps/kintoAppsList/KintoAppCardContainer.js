import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getVersionSelectItem } from '../../../../helpers/versionHelper'
import KintoAppCard from '../../../../components/dashboard/kintoApps/kintoAppsList/KintoAppCard'

function mapStateToProps(state, { kintoApp, index }) {
  const latestVersion = kintoApp.versions[0]
  const versions = kintoApp.versions.map(v => {
    const isFirst = kintoApp.versions.indexOf(v) === 0
    let result = getVersionSelectItem(v, kintoApp.id, true)
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

function mapDispatchToProps(dispatch, { onVersionCreate, kintoApp }) {
  return {
    onVersionCreate: () => onVersionCreate(kintoApp),
    push: url => dispatch(push(url))
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    goToLatest: () => dispatchProps.push(stateProps.latestVersion.url)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoAppCard
)
