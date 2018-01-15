import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import {
  ADMIN_ROLE,
  ADMIN_PERMISSION,
  OWNER_PERMISSION,
  EDITOR_PERMISSION
} from '../../../constants/permissions'
import WorkspaceToolbar from '../../../components/dashboard/ui/WorkspaceToolbar'

const getFormName = (isCreate, isKintoApp) => {
  if (isKintoApp) {
    return 'kintoAppForm'
  }
  return isCreate ? 'kintoBlockCreateForm' : 'kintoBlockManageForm'
}

function getMemberInfo(member, permission, included) {
  return {
    id: member.id,
    permission,
    email: member.email,
    username: member.username,
    included
  }
}

function mapStateToProps(state, { isKintoApp, kintoItem, isCreate }) {
  const formSelector = formValueSelector(getFormName(isCreate, isKintoApp))
  const currentUserId = state.auth.authSession.uid
  const workspace =
    state.workspaces.byId[state.workspaces.selectedWorkspace] || {}
  const workspaceMembers = workspace.members || []
  const formMembers = formSelector(state, 'members') || []
  const isFormPublic = formSelector(state, 'isPublic') || false
  kintoItem = kintoItem || {}

  let currentUserInfo = {}
  let ownerInfo = null

  let admins = []
  let members = []
  let allMembers = []

  workspaceMembers.forEach(member => {
    if (member.id === currentUserId) {
      const permission =
        member.id === kintoItem.ownerId || isCreate
          ? OWNER_PERMISSION
          : member.role === ADMIN_ROLE ? ADMIN_PERMISSION : EDITOR_PERMISSION
      currentUserInfo = getMemberInfo(member, permission, true)
    } else if (member.role === ADMIN_ROLE || member.id === kintoItem.ownerId) {
      const permission =
        member.id === kintoItem.ownerId ? OWNER_PERMISSION : ADMIN_PERMISSION
      const memberInfo = getMemberInfo(member, permission, true)
      if (permission === OWNER_PERMISSION) {
        ownerInfo = memberInfo
      } else {
        allMembers.unshift(memberInfo)
        admins.push(memberInfo)
      }
    } else {
      const isMember = formMembers.some(m => m === member.id)
      const memberInfo = getMemberInfo(member, EDITOR_PERMISSION, isMember)
      members.push(memberInfo)
      if (isFormPublic || isMember) {
        allMembers.push(memberInfo)
      }
    }
  })

  admins.unshift(currentUserInfo)
  if (ownerInfo) {
    admins.unshift(ownerInfo)
    allMembers.unshift(ownerInfo)
  }
  return {
    canCurrentUserManage: currentUserInfo.permission !== EDITOR_PERMISSION,
    isFormPublic: isFormPublic,
    currentUserInfo,
    admins,
    members,
    allMembers
  }
}

export default connect(mapStateToProps)(WorkspaceToolbar)
