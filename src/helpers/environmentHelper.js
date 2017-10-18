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
