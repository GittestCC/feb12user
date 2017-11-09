import isObject from 'lodash/isObject'

import { normalizeVersionObject } from './versionHelper'

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
