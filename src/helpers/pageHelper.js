import pathToRegexp from 'path-to-regexp'
import { dashboardSidebar, marketSidebar } from '../constants/pages'

export const getActivePageKey = (url, isDashboard) => {
  const list = isDashboard ? dashboardSidebar : marketSidebar
  let key = null
  list.some(item => {
    if (item.children) {
      const matchedSubItem = item.children.find(c => urlMatch(c.url, url))
      if (matchedSubItem) {
        key = matchedSubItem.key
        return true
      }
    }
    const matchedItem = urlMatch(item.url, url)
    if (matchedItem) {
      key = item.key
      return true
    }
    return false
  })
  return key
}

// returns the sidebar list with the active item marked as active
// and also group the result by `group` key
export const getListWithActiveItem = (key, isDashboard) => {
  const list = isDashboard ? dashboardSidebar : marketSidebar
  const listWithActiveItem = list.map(item => {
    if (key && item.key === key) {
      return { ...item, active: true }
    }
    if (item.children) {
      const isChildActive = item.children.some(c => c.key === key)
      if (key && isChildActive) {
        return { ...item, active: true }
      }
    }
    return item
  })
  const groups = listWithActiveItem.reduce((all, item) => {
    if (all.indexOf(item.group) === -1) {
      all.push(item.group)
    }
    return all
  }, [])
  return groups.map(group => {
    return listWithActiveItem.filter(item => item.group === group)
  })
}

function urlMatch(urlSchema, url) {
  return !!pathToRegexp(urlSchema).exec(url)
}
