import { createSelector } from 'reselect'
import { getDependencyInfo } from '../helpers/kintoBlocksHelper'
import { isBranchVersionEqual } from '../helpers/versionHelper'

export const getAllKintoApps = createSelector(
  state => state.kintoApps.allIds.map(a => state.kintoApps.byId[a]),
  state => state.kintoBlocksDependenciesCache,
  (kintoApps = [], dependenciesCache) => {
    return kintoApps.map(app => {
      const dependencies = app.appDependencies || []
      return {
        ...app,
        dependencies: dependencies.map(d => {
          return getDependencyInfo(d, dependenciesCache, true)
        })
      }
    })
  }
)

export const getKintoAppDependenciesEnvConfig = createSelector(
  (state, { id }) => state.kintoApps.byId[id],
  (_, params) => params,
  (kintoApp, { env, ver }) => {
    if (!kintoApp || !kintoApp.dependenciesConfig) {
      return null
    }
    const { dependenciesConfig } = kintoApp
    // mismatch
    if (
      dependenciesConfig.envId !== env ||
      !isBranchVersionEqual(dependenciesConfig.version, ver, true)
    ) {
      return null
    }
    return dependenciesConfig.data
  }
)

export const getKintoAppDependencies = createSelector(
  (state, { id }) => state.kintoApps.byId[id],
  (_, params) => params,
  state => state.kintoBlocksDependenciesCache,
  (kintoApp = {}, { ver }, dependenciesCache) => {
    if (!isBranchVersionEqual(kintoApp.version, ver, true)) {
      return []
    }
    const dependencies = kintoApp.appDependencies || []
    return dependencies.map(d => {
      return getDependencyInfo(d, dependenciesCache)
    })
  }
)
