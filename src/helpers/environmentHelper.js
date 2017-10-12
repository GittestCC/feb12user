import isObject from 'lodash/isObject'
import { normalizeVersionObject } from './versionHelper'

export const getEnvironmentButtonClass = state => {
  if (!state) return ''
  switch (state) {
    case 'FAILED':
    case 'SHUTDOWN':
    case 'SUCCESS':
      return 'default'
    case 'TESTING':
      return 'dark'
    default:
      throw new Error('unknown state')
  }
}

export const getEnvironmentButtonText = state => {
  if (!state) return 'Deploy'
  switch (state) {
    case 'FAILED':
    case 'SUCCESS':
      return 'Deploy Another Version'
    case 'SHUTDOWN':
      return 'Deploy'
    case 'TESTING':
      return 'Cancel Deployment'
    default:
      throw new Error('unknown state')
  }
}

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
