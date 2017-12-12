import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  isVersionEqual,
  getVersionAsText,
  getEnvVersionsList
} from '../../../../helpers/versionHelper'
import { getPageUrl } from '../../../../helpers/urlHelper'
import { pages } from '../../../../constants/pages'
import KintoAppCard from '../../../../components/dashboard/kintoApps/kintoAppsList/KintoAppCard'

function mapStateToProps(state, { kintoApp, index }) {
  const tagList = kintoApp.versions.map(v => {
    const isDraft = isVersionEqual(v, '0.0.0')
    return {
      text: isDraft ? 'Draft' : getVersionAsText(v),
      special: isDraft,
      releases: v.environments,
      url: getPageUrl(pages.dashboardKintoAppsManage, {
        id: kintoApp.id,
        version: getVersionAsText(v)
      })
    }
  })
  return {
    kintoApp,
    tagList,
    envVersionsList: getEnvVersionsList(kintoApp.versions),
    dropdownId: `id-${index}`,
    dropdownVersionId: `idv-${index}`,
    dropdownDependencyId: `idd-${index}`
  }
}

function mapDispatchToProps(dispatch, { kintoApp }) {
  return {
    push: url => dispatch(push(url)),
    goToEnvironment: () =>
      dispatch(push(`/app/dashboard/kintoapps/${kintoApp.id}/environments`))
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    goToDraft: () => dispatchProps.push(stateProps.tagList[0].url)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  KintoAppCard
)
