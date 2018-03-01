import { createSelector } from 'reselect'
import { ADMIN_ROLE } from '../constants/permissions'

export const isCurrentUserAdminSelector = createSelector(
  state => state.currentUser,
  state => state.workspaces,
  (currentUser, workspaces) => {
    const userId = currentUser.id
    if (!userId || !workspaces.selectedWorkspace) {
      return false
    }
    const selectedWorkspace =
      workspaces.byId[workspaces.selectedWorkspace] || {}
    const members = selectedWorkspace.members || []
    return members.some(m => m.id === userId && m.role === ADMIN_ROLE)
  }
)
