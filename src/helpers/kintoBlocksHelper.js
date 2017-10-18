import { isVersionEqual } from './versionHelper'

export const isDependencySimple = dependency => {
  return dependency.versions || dependency.dependencies
}

export const getDependencyInfo = (dependency, dependenciesCache, isSimple) => {
  const dependencyMeta = dependenciesCache[dependency.blockId]
  if (!dependencyMeta) {
    return {
      ...dependency,
      dependencies: []
    }
  }
  let result = {
    ...dependency,
    ...dependencyMeta
  }
  if (!isSimple) {
    result.dependencies = findAssociatedDependencies(
      dependency.version,
      dependencyMeta.dependencies || [],
      dependenciesCache
    )
  }
  return result
}

export const getClassNameForType = type => {
  switch (type) {
    case 'KINTOBLOCK':
      return 'kintoblock'
    case 'SERVICE':
      return 'service'
    default:
      // TODO throw new Error('Invalid kintoblock type for classname')
      return ''
  }
}

function findAssociatedDependencies(version, dependencies, cache) {
  return dependencies
    .filter(d => d.residesIn.some(rv => isVersionEqual(rv, version)))
    .map(d => {
      return {
        id: d.id,
        ...cache[d.blockId]
      }
    })
}
