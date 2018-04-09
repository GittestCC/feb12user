import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getListWithActiveItem } from '../../helpers/pageHelper'
import { getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import { isCurrentUserAdminSelector } from '../../selectors/auth'
import SideBar from '../../components/app/SideBar'

function mapStateToProps(state, { isSideBarShownMobile }) {
  const { isDashboard, activePage } = state.pageOptions
  const isCurrentUserAdmin = isCurrentUserAdminSelector(state)
  const selectedWorkspaceId = state.workspaces.selectedWorkspace
  const selectedWorkspace = state.workspaces.byId[selectedWorkspaceId] || {}
  const workspaces = state.workspaces.allIds.map(i => {
    const workspace = state.workspaces.byId[i]
    return {
      id: workspace.id,
      name: workspace.name
    }
  })
  workspaces.unshift({ id: '0', name: 'Create new workspace' })

  return {
    list: getListWithActiveItem(activePage, selectedWorkspaceId, isDashboard),
    isSideBarShownMobile,
    workspaces,
    selectedWorkspaceId,
    selectedWorkspaceMembers: selectedWorkspace.members || [],
    isCurrentUserAdmin
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    selectWorkspace: id => {
      if (id === '0') {
        dispatchProps.push(getPageUrl(pages.workspaceCreate))
      } else {
        dispatchProps.push(getPageUrl(pages.dashboardHome, { workspaceId: id }))
        stateProps.selectedWorkspaceId = id
      }
    }
  }
}

export default connect(mapStateToProps, { push }, mergeProps)(SideBar)
