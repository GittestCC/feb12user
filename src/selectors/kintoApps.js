import { createSelector } from 'reselect'
import keyBy from 'lodash/keyBy'
import { getDependencyInfo } from '../helpers/kintoBlocksHelper'

export const getAppDependenciesFactory = () => {
  return createSelector(
    (state, id) => state.kintoApps.byId[id],
    state => state.kintoBlocksDependenciesCache,
    (kintoApp, dependenciesCache) => {
      if (!kintoApp || !kintoApp.appDependencies) {
        return []
      }
      const result = kintoApp.appDependencies.map(d => {
        return getDependencyInfo(d, dependenciesCache)
      })
      return keyBy(result, 'id')
    }
  )
}

export const getAllKintoApps = createSelector(
  state => state.kintoApps.allIds.map(a => state.kintoApps.byId[a]),
  state => state.kintoBlocksDependenciesCache,
  (kintoApps = [], dependenciesCache) => {
    return kintoApps.map(app => {
      const dependencies = app.appDependencies
      return {
        ...app,
        dependencies: dependencies.map(d => {
          return getDependencyInfo(d, dependenciesCache, true)
        })
      }
    })
  }
)
