import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'

export const normalizeVersionObject = v => ({
  major: v.major || 0,
  minor: v.minor || 0,
  revision: v.revision || 0,
  build: v.build || 0
})

export const getVersionAsText = v => {
  if (isObject(v)) {
    v = normalizeVersionObject(v)
  }
  if (!v || !isNumber(v.major) || !isNumber(v.minor) || !isNumber(v.revision)) {
    return undefined
  }
  if (!v || !v.build) {
    return `${v.major || 0}.${v.minor || 0}.${v.revision || 0}`
  }

  return `${v.major || 0}.${v.minor || 0}.${v.revision || 0} (${v.build || 0})`
}

export const asTextList = (versions = []) => versions.map(getVersionAsText)

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

export const getVersionSelectItem = (version, id, isKintoApp) => ({
  text: getVersionAsText(version),
  tag: version.state,
  className: getVersionStateClassName(version),
  url: isKintoApp
    ? getManageUrlForKintoApp(id, version)
    : getManageUrlForKintoBlock(id, version)
})

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
  return a.major === b.major && a.minor === b.minor && a.revision === b.revision
}

export const findInArrayByText = (versions, text) => {
  if (!versions) return null
  const version = textToObject(text)
  return versions.find(v => isVersionEqual(v, version))
  // return versions.find(version)
}

export const getManageUrlForKintoBlock = (id, version) =>
  `/app/dashboard/kintoblocks/${id}/versions/${getVersionAsText(version)}`

export const getManageUrlForKintoApp = (id, version) =>
  `/app/dashboard/kintoapps/${id}/versions/${getVersionAsText(version)}`

export const getUrlForAppEnvironment = id =>
  `/app/dashboard/kintoapps/${id}/environments`
