import pages from './pages'

export default {
  [pages.dashboardBlockCreate]: {
    submitLabel: 'Create New KintoBlock',
    formName: 'kintoBlockCreateForm' // must match redux form name
  },
  [pages.dashboardBlockManage]: {
    submitLabel: 'Save Changes',
    formName: 'kintoBlockManageForm'
  },
  [pages.dashboardKintoAppsManage]: {
    submitLabel: 'Save Changes',
    formName: 'kintoAppForm'
  },
  [pages.dashboardKintoAppsCreate]: {
    submitLabel: 'Create New Application',
    formName: 'kintoAppForm'
  },
  [pages.dashboardKintoAppDependenciesConfig]: {
    submitLabel: 'Save Changes',
    formName: 'kintoAppConfigForm'
  }
}
