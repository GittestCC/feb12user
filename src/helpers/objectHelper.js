import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

function mergeStrategy(objValue, srcValue) {
  // we won't want to merge version objects
  if (
    isObject(srcValue) &&
    (srcValue.major || srcValue.minor || srcValue.revision)
  ) {
    return srcValue
  }
  if (isArray(objValue)) {
    // if there is no id don't merge arrays just return the updated one
    if (srcValue.every(s => !s.id)) {
      return srcValue
    }
    return srcValue.map(src => {
      return {
        ...objValue.find(o => o.id),
        ...src
      }
    })
  }
}

export const merge = (orig, data) => {
  return mergeWith({}, orig, data, mergeStrategy)
}
