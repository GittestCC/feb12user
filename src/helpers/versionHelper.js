import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'

export const normalizeVersionObject = v => ({
  major: v.major || 0,
  minor: v.minor || 0,
  revision: v.revision || 0,
  build: v.build || 0
})

export const getVersionAsText = (v, isDottedBuild) => {
  if (isObject(v)) {
    v = normalizeVersionObject(v)
  }
  if (!v || !isNumber(v.major) || !isNumber(v.minor) || !isNumber(v.revision)) {
    return undefined
  }
  if (!v || !v.build) {
    return `${v.major || 0}.${v.minor || 0}.${v.revision || 0}`
  }
  let base = `${v.major || 0}.${v.minor || 0}.${v.revision || 0}`
  if (isDottedBuild) {
    return `${base}.${v.build || 0}`
  } else {
    return `${base} (${v.build || 0})`
  }
}

export const getVersionType = v => (v && v.type ? v.type.toLowerCase() : null)

export const asTextList = (versions = []) => {
  return versions.map(v => getVersionAsText(v, true))
}

export const getVersionStateClassName = version => {
  if (!version || !version.state) return ''
  switch (version.state) {
    case 'PENDING':
      return 'orange'
    case 'PUBLISHED':
      return 'green'
    case 'DRAFT':
      return 'purple'
    default:
      throw new Error('unknown version state')
  }
}

export const textToObject = v => {
  const regex = /(\d+)\.(\d+)\.(\d+)\.?\s?(\d+)?(?:\((\d+)\))?/
  const match = regex.exec(v)
  if (!match) return null
  let result = {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    revision: parseInt(match[3], 10)
  }
  const build = match[4] || match[5]
  if (build) {
    result.build = parseInt(build, 10)
  }
  return result
}

/**
 * does an equality between two version objects with some processing
 * if params are string convert them to version objs
 * if params are objects and has versions inside of them then select those
 * then do equality between two version
 */
export const isVersionEqual = (a, b) => {
  if (!a || !b) {
    return false
  }
  if (typeof a === 'string') {
    a = textToObject(a)
  }
  if (typeof b === 'string') {
    b = textToObject(b)
  }
  a = normalizeVersionObject(a)
  b = normalizeVersionObject(b)
  return (
    a.major === b.major &&
    a.minor === b.minor &&
    a.revision === b.revision &&
    a.build === b.build
  )
}

export const isBranchVersionEqual = (a, b) => {
  if (!a || !b) {
    return false
  }
  return a.type.toUpperCase() === b.type.toUpperCase() && a.name === b.name
}

export const getEnvVersionsList = versions => {
  const result = []
  versions.forEach(v => {
    if (v.environments) {
      v.environments.forEach(e => {
        result.push({
          envName: e,
          version: v
        })
      })
    }
  })
  return result
}

export const getUrlForAppEnvironment = id =>
  `/app/dashboard/kintoapps/${id}/environments`

export const getUrlForAppConfigDependencies = (id, version, env) =>
  `/app/dashboard/kintoapps/${id}/versions/${version}/config/${env}`

export const getUrlForAppEditEnvironment = (id, envId) =>
  `/app/dashboard/kintoapps/${id}/environment/${envId}/edit`
