import pathToRegexp from 'path-to-regexp'
import { githubUrl } from '../constants/github'
import { urls } from '../constants/pages'

export const getPageUrl = (page, urlParams, queryParams, ignoreError) => {
  let url = urls[page]
  if (!url) {
    throw new Error('there is no url defined for that page')
  }
  url = getUrl(url, urlParams, ignoreError)
  if (!queryParams) {
    return url
  }
  Object.keys(queryParams).forEach((key, index) => {
    const prefix = index === 0 ? '?' : '&'
    url += `${prefix}${key}=${queryParams[key]}`
  })
  return url
}

export const githubConnectUrl = (workspaceId, pageType) => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  return workspaceId ? githubUrl(clientId, workspaceId, pageType || '') : ''
}

export const getServerUrl = (microservice, url) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL
  let updatedBaseUrl = baseUrl
  const type = process.env.REACT_APP_URL_TYPE || 'null'
  if (microservice) {
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
  }
  return updatedBaseUrl + url
}

export const getUrl = (url, params, ignoreError) => {
  try {
    return pathToRegexp.compile(url)(params)
  } catch (e) {
    if (ignoreError) {
      return ''
    }
    throw new Error(e)
  }
}
