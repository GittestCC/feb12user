import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import isEmpty from 'lodash/isEmpty'
import { getPageUrl } from '../../../helpers/urlHelper'
import { pages } from '../../../constants/pages'
import KintoBlockCreate from '../../../components/dashboard/kintoBlocks/KintoBlockCreate'

function mapStateToProps(state) {
  const selectedWorkspace = state.workspaces.selectedWorkspace
  const organizations = state.workspaces.byId[selectedWorkspace].organizations
  const hasOrganizations = !isEmpty(organizations)

  return {
    hasOrganizations,
    workspaceId: selectedWorkspace
  }
}

function mergeProps(stateProps, dispatchProps) {
  const redirectLink = getPageUrl(pages.dashboardHome, {
    workspaceId: stateProps.workspaceId
  })
  return {
    ...stateProps,
    ...dispatchProps,
    goToRedirectLink: () => dispatchProps.push(redirectLink)
  }
}

export default connect(mapStateToProps, { push }, mergeProps)(KintoBlockCreate)
