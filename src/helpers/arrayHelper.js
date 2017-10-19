import flatMap from 'lodash/flatMap'

/**
 * generic function for filtering parent with nested children array
 * this will return the parents that didn't match if any of the children matches
 * @param {array} array the collection needed to be filtered
 * @param {string} childrenKey the key for the children collection on each parent
 * @param {string} fieldKey the key that needs to be filtered
 * @param {string} filter the filter text
 * @return {array} filtered array
 */
export const filterArrayAndChildren = (
  array = [],
  childrenKey,
  fieldKey,
  filter
) => {
  if (!filter) {
    return array
  }
  filter = filter.toUpperCase()
  const newArray = []
  array.forEach(parent => {
    const children = filterArray(parent[childrenKey], fieldKey, filter)
    // if parent and children are empty, then return
    if (
      parent[fieldKey].toUpperCase().indexOf(filter) === -1 &&
      !children.length
    ) {
      return
    }
    newArray.push({
      ...parent,
      [parent[childrenKey]]: children
    })
  })
  return newArray
}

export const filterArray = (array = [], key, filter) => {
  if (!filter) {
    return array
  }
  filter = filter.toUpperCase()
  return array.filter(i => {
    if (!i[key]) {
      return false
    }
    return i[key].toUpperCase().indexOf(filter) !== -1
  })
}

export const flattenNestedToIds = (array = [], childrenKey, idKey) => {
  return flatMap(array, item => {
    const children = item[childrenKey] || []
    let childrenIds = children.map(c => c[idKey])
    childrenIds.unshift(item[idKey])
    return childrenIds
  })
}
