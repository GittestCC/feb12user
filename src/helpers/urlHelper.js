import pathToRegexp from 'path-to-regexp'
import { urls } from '../constants/pages'

export const getPageUrl = (page, params) => {
  const url = urls[page]
  if (!url) {
    throw new Error('there is no url defined for that page')
  }
  return getUrl(url, params)
}

export const getUrl = (url, params) => pathToRegexp.compile(url)(params)
