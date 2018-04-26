export const githubUrl = (clientId, workspaceId, pageType) =>
  `https://github.com/login/oauth/authorize?scope=repo%20write:repo_hook&state=${workspaceId}-${pageType}&client_id=${clientId}`

export const pageTypes = {
  KB_CREATE: 'KB_CREATE'
}
