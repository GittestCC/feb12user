import { createSelector } from 'reselect'
import { ADMIN_PERMISSION } from '../constants/permissions'

export const isCurrentUserAdminSelector = createSelector(
  state => state.auth.authSession,
  state => state.workspaces,
  (authSession = {}, workspaces) => {
    const userId = authSession.uid
    if (!userId || !workspaces.selectedWorkspace) {
      return false
    }
    const selectedWorkspace =
      workspaces.byId[workspaces.selectedWorkspace] || {}
    const members = selectedWorkspace.members || []
    return members.some(
      m => m.id === userId && m.permission === ADMIN_PERMISSION
    )
  }
)
