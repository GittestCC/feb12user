import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { pages } from '../../constants/pages'
import { getPageUrl } from '../../helpers/urlHelper'

import WorkspaceSwitcher from '../../components/breadcrumbs/WorkspaceSwitcher'

function mapStateToProps(state) {
  const { selectedWorkspace, byId, allIds } = state.workspaces
  const selectedItem = byId[selectedWorkspace] || {}

  const dropdownItems = allIds.map(w => {
    const workspace = byId[w]
    return {
      text: workspace.name,
      active: selectedItem && selectedItem.id === workspace.id,
      url: getPageUrl(pages.workspaceEdit, { workspaceId: workspace.id })
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
