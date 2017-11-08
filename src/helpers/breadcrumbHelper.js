import {
  getVersionAsText,
  getManageUrlForKintoApp,
  getUrlForAppEnvironment,
  getManageUrlForKintoBlock,
  getUrlForAppEditEnvironment
} from './versionHelper'
import startCase from 'lodash/startCase'

export const getUrlForDropdown = (type, app) => {
  if (!type) return '/app/dashoard'
  switch (type) {
    case 'app':
      return getManageUrlForKintoApp(app.id, app.versions[0])
    case 'block':
      return getManageUrlForKintoBlock(app.id, app.versions[0])
    case 'env':
      return getUrlForAppEnvironment(app.id)
    default:
      return '/app/dashoard'
  }
}

export const getBreadcrumbSelectItem = (app, id, isKintoApp) => {
  return {
    text: app.name,
    version: getVersionAsText(app.versions[0]),
    url: getUrlForDropdown(isKintoApp, app),
    active: app.id === id
  }
}

export const getEnvironmentSelectItem = (env, id, envId) => {
  return {
    text: startCase(env.name),
    url: getUrlForAppEditEnvironment(id, env.id),
    active: env.id === envId
  }
}
