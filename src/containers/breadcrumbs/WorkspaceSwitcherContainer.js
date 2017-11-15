import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from '../../constants/pages'
import { getPageUrl } from '../../helpers/urlHelper'

import WorkspaceSwitcher from '../../components/breadcrumbs/WorkspaceSwitcher'

function mapStateToProps(state) {
  const selectedItem =
    state.workspaces.byId[state.pageOptions.selectedEditingWorkspaceId] || {}
  const dropdownItems = state.workspaces.allIds.map(w => {
    const workspace = state.workspaces.byId[w]
    return {
      text: workspace.name,
      active: selectedItem && selectedItem.id === workspace.id,
      url: getPageUrl(pages.workspaceEdit, { id: workspace.id })
    }
  })

  return {
    dropdownItems,
    selectedItemName: selectedItem.name || ''
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actionHandler: () => dispatch(push(getPageUrl(pages.workspaceCreate)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceSwitcher)
