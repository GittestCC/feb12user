import { connect } from 'react-redux'
import { formValueSelector, change } from 'redux-form'
import WorkspaceToolbar from '../../../components/dashboard/ui/WorkspaceToolbar'

const getFormName = (isCreate, isKintoApp) => {
  if (isKintoApp) {
    return 'kintoAppForm'
  } else {
    if (isCreate) {
      return 'kintoBlockCreateForm'
    } else {
      return 'kintoBlockManageForm'
    }
  }
}

function mapStateToProps(state, { isKintoApp, kintoItem, isCreate }) {
  const formSelector = formValueSelector(getFormName(isCreate, isKintoApp))
  const currentWorkspace =
    state.workspaces.byId[state.workspaces.selectedWorkspace] || {}
  const selectedId = state.workspaces.selectedWorkspace
  const currentUser = state.auth.authSession || {}
  const formMembers = formSelector(state, 'members')
  const formIsPublic = formSelector(state, 'isPublic')
  kintoItem = kintoItem || {}

  let currentUserInfo = {}
  let admins = []
  let members = []
  let allMembers = []

  if (state.workspaces.byId[selectedId]) {
    state.workspaces.byId[selectedId].members.forEach(member => {
      if (member.permission === 'Admin' || member.id === kintoItem.ownerId) {
        let appPermission =
          member.id === kintoItem.ownerId && member.id !== currentUser.uid
            ? 'Owner'
            : 'Admin'

        if (member.id === currentUser.uid) {
          if (isCreate) {
            appPermission = 'Owner'
          }

          currentUserInfo = {
            email: member.email,
            included: true,
            permission: appPermission,
            username: member.username,
            id: member.id
          }
        }

        admins.push({
          email: member.email,
          included: true,
          permission: appPermission,
          username: member.username,
          id: member.id
        })

        allMembers.push({
          username: member.username,
          permission: appPermission
        })
      } else {
        const regularMember = formMembers
          ? formMembers.find(kaMember => kaMember.id === member.id)
          : null

        members.push({
          email: member.email,
          included: !!regularMember,
          permission: 'Editor',
          username: member.username,
          id: member.id
        })
        if (formIsPublic || regularMember) {
          allMembers.push({
            username: member.username,
            permission: 'Editor'
          })
        }
      }
    })
  }

  return {
    isPublicValue: formIsPublic,
    currentUserInfo,
    admins,
    members,
    allMembers: allMembers.sort((a, b) => a.permission > b.permission),
    currentWorkspace,
    currentUser
  }
}

function mapDispatchToProps(dispatch, { isKintoApp, kintoItem, isCreate }) {
  return {
    toggleMembers: (isPublic, workspaceMembers) => {
      if (isPublic) {
        let privateMembers = []

        workspaceMembers.forEach(member => {
          if (member.permission === 'Member') {
            privateMembers.push({
              id: member.id,
              permission: 'Editor'
            })
          }
        })

        dispatch(
          change(getFormName(isCreate, isKintoApp), 'members', privateMembers)
        )
      } else {
        dispatch(change(getFormName(isCreate, isKintoApp), 'members', null))
      }
    }
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    toggleIsPublic: isPublic =>
      dispatchProps.toggleMembers(isPublic, stateProps.currentWorkspace.members)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  WorkspaceToolbar
)
