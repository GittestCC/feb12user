import pathToRegexp from 'path-to-regexp'
import { urls } from '../constants/pages'

export const getPageUrl = (page, params) => {
  const url = urls[page]
  if (!url) {
    throw new Error('there is no url defined for that page')
  }
  return getUrl(url, params)
}

export const githubConnectUrl = workspaceId => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  return workspaceId
    ? `https://github.com/login/oauth/authorize?state=${workspaceId}&client_id=${clientId}`
    : ''
}

export const getUrl = (url, params) => pathToRegexp.compile(url)(params)
