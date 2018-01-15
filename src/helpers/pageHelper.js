import pathToRegexp from 'path-to-regexp'
import { dashboardSidebar, marketSidebar, urls } from '../constants/pages'
import { getUrl } from './urlHelper'

export const getActivePageKey = (url, isDashboard) => {
  let matchedPage = null
  Object.keys(urls).forEach(key => {
    if (matchedPage) return
    if (urlMatch(urls[key], url)) {
      matchedPage = key
    }
  })
  return matchedPage
}

// returns the sidebar list with the active item marked as active
// and also group the result by `group` key
export const getListWithActiveItem = (key, workspaceId, isDashboard) => {
  const list = isDashboard ? dashboardSidebar : marketSidebar
  const listWithActiveItem = list.map(item => {
    const url = getUrl(item.url, { workspaceId: workspaceId || '0' })
    if (key && item.key === key) {
      return { ...item, url, active: true }
    }
    if (item.children) {
      const isChildActive = item.children.some(c => c.key === key)
      if (key && isChildActive) {
        return { ...item, url, active: true }
      }
    }
    return { ...item, url }
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

export const isProduction = () =>
  process.env.NODE_ENV === 'production' && !process.env.REACT_APP_SHOW_DEV_UI

function urlMatch(urlSchema, url) {
  return !!pathToRegexp(urlSchema).exec(url)
}
