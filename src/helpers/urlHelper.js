import pathToRegexp from 'path-to-regexp'
import { urls } from '../constants/pages'

export const getPageUrl = (page, urlParams, queryParams) => {
  let url = urls[page]
  if (!url) {
    throw new Error('there is no url defined for that page')
  }
  url = getUrl(url, urlParams)
  if (!queryParams) {
    return url
  }
  Object.keys(queryParams).forEach((key, index) => {
    const prefix = index === 0 ? '?' : '&'
    url += `${prefix}${key}=${queryParams[key]}`
  })
  return url
}

export const githubConnectUrl = workspaceId => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  return workspaceId
    ? `https://github.com/login/oauth/authorize?scope=repo&state=${workspaceId}&client_id=${clientId}`
    : ''
}

export const getServerUrl = (microservice, url) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL
  let updatedBaseUrl = null
  const type = process.env.REACT_APP_URL_TYPE || 'null'
  switch (type) {
    case 'subdomain':
      const http = baseUrl.match(/^(https?):\/\//)[0]
      updatedBaseUrl = baseUrl.replace(http, `${http}${microservice}.`)
      break
    case 'append':
      updatedBaseUrl = `${baseUrl}/${microservice}/`
      break
    case 'null':
      updatedBaseUrl = baseUrl
      break
    default:
      throw new Error('you have to set REACT_APP_URL_TYPE correctly')
  }
  return updatedBaseUrl + url
}

export const getUrl = (url, params) => pathToRegexp.compile(url)(params)
