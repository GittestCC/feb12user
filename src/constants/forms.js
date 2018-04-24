import { pages } from './pages'

export default {
  [pages.dashboardKintoBlocksCreate]: {
    submitLabel: 'Create New KintoBlock',
    formName: 'kintoBlockCreateForm' // must match redux form name
  },
  [pages.dashboardKintoBlocksManage]: {
    submitLabel: 'Save Changes',
    formName: 'kintoBlockManageForm',
    toggleVisibility: true // whether the button should switch between save and tag and deploy
  },
  [pages.dashboardKintoAppsManage]: {
    submitLabel: 'Save Changes',
    formName: 'kintoAppForm',
    toggleVisibility: true
  },
  [pages.dashboardKintoAppsCreate]: {
    submitLabel: 'Create New Application',
    formName: 'kintoAppForm'
  },
  [pages.dashboardKintoAppsDependenciesConfig]: {
    submitLabel: 'Save Changes',
    formName: 'kintoAppConfigForm'
  },
  [pages.dashboardKintoAppsEnvironmentEdit]: {
    submitLabel: 'Save Changes',
    formName: 'KintoAppEnvironmentForm'
  },
  [pages.workspaceCreate]: {
    submitLabel: 'Create New Workspace',
    formName: 'WorkspaceFormCreate'
  },
  [pages.workspaceEdit]: {
    submitLabel: 'Save Changes',
    formName: 'WorkspaceFormEdit'
  }
}
