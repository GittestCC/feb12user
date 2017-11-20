import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getListWithActiveItem } from '../../helpers/pageHelper'
import { getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import { workspaceSelect } from '../../actions/workspaces'
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
    list: getListWithActiveItem(activePage, isDashboard),
    isSideBarShownMobile,
    workspaces,
    selectedWorkspaceId,
    selectedWorkspaceMembers: selectedWorkspace.members || [],
    isCurrentUserAdmin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: url => dispatch(push(url)),
    selectWorkspace: id => {
      if (id === '0') {
        dispatch(push(getPageUrl(pages.workspaceCreate)))
      } else {
        dispatch(push(getPageUrl(pages.dashboardHome)))
        dispatch(workspaceSelect(id))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
