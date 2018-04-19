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
  return `${v.major || 0}.${v.minor || 0}.${v.revision || 0}`
}

export const getVersionType = v => (v && v.type ? v.type.toLowerCase() : null)

export const asTextList = (versions = []) => {
  return versions.map(v => getVersionAsText(v))
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

export const isBranchVersionEqual = (a, b, matchNameOnly) => {
  if (!a || !b) {
    return false
  }
  // if match only can pass strings
  if (matchNameOnly) {
    a = a.name ? a.name : a
    b = b.name ? b.name : b
    return a === b
  }

  return a.type.toUpperCase() === b.type.toUpperCase() && a.name === b.name
}
