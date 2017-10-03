import {
  getVersionAsText,
  getManageUrlForKintoApp,
  getManageUrlForKintoBlock
} from './versionHelper'

export const getBreadcrumbSelectItem = (app, id, isKintoApp) => {
  return {
    text: app.name,
    version: getVersionAsText(app.versions[0]),
    url: isKintoApp
      ? getManageUrlForKintoApp(app.id, app.versions[0])
      : getManageUrlForKintoBlock(app.id, app.versions[0]),
    active: app.id === id
  }
}
