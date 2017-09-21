import { createSelector } from 'reselect'

export const getAllKintoApps = createSelector(
  state => state.kintoApps,
  kintoApps => {
    return kintoApps.allIds.map(id => kintoApps.byId[id])
  }
)
