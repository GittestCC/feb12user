import { deploymentState } from '../constants/deploymentStates'

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

export const getLiveEnvironmentListForTag = (tag, environments) => {
  if (!environments || !environments.length) {
    return []
  }
  return environments.reduce((list, env) => {
    const tagName = getLastSuccesTag(env)
    if (tagName === tag) {
      list.push(env.name)
    }
    return list
  }, [])
}

export const getLiveEnvironmentsForApp = environments => {
  if (!environments || !environments.length) {
    return []
  }
  return environments.reduce((list, env) => {
    const tagName = getLastSuccesTag(env)
    if (tagName) {
      list.push({ name: env.name, tag: tagName })
    }
    return list
  }, [])
}

const getLastSuccesTag = env => {
  if (!env.releases || !env.releases.length) {
    return null
  }
  const currentRelease = env.releases[env.releases.length - 1]
  const lastStep = currentRelease.steps[currentRelease.steps.length - 1]
  if (lastStep.state === deploymentState.success) {
    return currentRelease.version.name
  }
  return null
}
