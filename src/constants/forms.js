import pages from './pages'

export default {
  [pages.dashboardBlockCreate]: {
    submitLabel: 'Create New KintoBlock',
    formName: 'kintoBlockCreateForm' // must match redux form name
  },
  [pages.dashboardKintoAppsManage]: {
    submitLabel: 'Edit Application',
    formName: 'kintoAppForm'
  }
}
