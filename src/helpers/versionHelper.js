import isNumber from 'lodash/isNumber'

export const getVersionAsText = v => {
  if (!v || !isNumber(v.major) || !isNumber(v.minor) || !isNumber(v.revision)) {
    return null
  }
  return `${v.major}.${v.minor}.${v.revision}`
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
  const regex = /(\d+)\.(\d+)\.(\d+)/
  const match = regex.exec(v)
  if (!match) return null
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    revision: parseInt(match[3], 10)
  }
}

/**
 * does an equality between two version objects with some processing
 * if params are string convert them to version objs
 * if params are objects and has versions inside of them then select those
 * then do equality between two version
 */
export const isVersionEqual = (a, b) => {
  if (typeof a === 'string') {
    a = textToObject(a)
  }
  if (typeof b === 'string') {
    b = textToObject(b)
  }
  return a.major === b.major && a.minor === b.minor && a.revision === b.revision
}

export const findInArrayByText = (versions, text) => {
  if (!versions) return null
  const version = textToObject(text)
  return versions.find(v => isVersionEqual(v, version))
}

export const getManageUrlForKintoBlock = (id, version) =>
  `/app/dashboard/kintoblocks/${id}/versions/${getVersionAsText(version)}`

export const getManageUrlForKintoApp = (id, version) =>
  `/app/dashboard/kintoapps/${id}/versions/${getVersionAsText(version)}`
