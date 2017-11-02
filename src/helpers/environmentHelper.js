import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'

import {
  normalizeVersionObject,
  getUrlForAppConfigDependencies
} from './versionHelper'

export const getEnvironmentVersionAndBuild = v => {
  if (!v) {
    return {}
  }

  if (isObject(v)) {
    v = normalizeVersionObject(v)
  }

  const version = `${v.major}.${v.minor}.${v.revision}`
  const build = `${v.build}`

  return {
    build: build,
    version: version
  }
}

export const getEnvironmentSelectList = (envs, id, version, envId) => {
  if (isEmpty(envs)) {
    return []
  }
  if (envs[0].id !== '0') {
    envs = [
      {
        id: '0',
        name: 'Environment Defaults'
      },
      ...envs
    ]
  }
  return envs.map(e => ({
    text: e.name,
    url: getUrlForAppConfigDependencies(id, version, e.id),
    active: e.id === envId
  }))
}

export const getEnvironmentButtonInfo = status => {
  status = status.toLowerCase()
  switch (status) {
    case 'failed':
    case 'success':
      return {
        className: 'default',
        type: 'deploy',
        title: 'Deploy Another Version'
      }
    case 'shutdown':
    case 'processing':
      return {
        className: 'default',
        type: 'deploy',
        title: 'Deploy'
      }
    case 'testing':
      return {
        className: 'dark',
        type: status,
        title: 'Cancel Deployment'
      }
    default:
      return {
        className: 'default',
        type: 'deploy',
        title: 'Deploy'
      }
  }
}
