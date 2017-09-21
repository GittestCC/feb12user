export const getVersion = v => {
  return `${v.major}.${v.minor}.${v.revision}`
}

export const getVersionStateClassName = state => {
  switch (state) {
    case 'PENDING':
      return 'orange'
    case 'PUBLISHED':
      return 'green'
    case 'DRAFT':
      return 'purple'
    default:
      throw new Error('unknown version state')
  }
}

export const getManageUrlForKintoBlock = (kintoBlock, version) =>
  `/app/dashboard/kintoblocks/${kintoBlock.id}/versions/${getVersion(version)}`

export const getManageUrlForKintoApp = (kintoApp, version) =>
  `/app/dashboard/kintoapps/${kintoApp.id}/versions/${getVersion(version)}`
