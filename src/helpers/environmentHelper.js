export const getEnvironmentButtonInfo = status => {
  status = status.toLowerCase()
  switch (status) {
    case 'failed':
    case 'success':
      return {
        className: 'default',
        type: 'deploy',
        title: 'Deploy Another Version'
      }
    case 'shutdown':
    case 'processing':
      return {
        className: 'default',
        type: 'deploy',
        title: 'Deploy'
      }
    case 'testing':
      return {
        className: 'dark',
        type: status,
        title: 'Cancel Deployment'
      }
    default:
      return {
        className: 'default',
        type: 'deploy',
        title: 'Deploy'
      }
  }
}
