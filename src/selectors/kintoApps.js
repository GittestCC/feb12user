import { createSelector } from 'reselect'
import { getDependencyInfo } from '../helpers/kintoBlocksHelper'

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
