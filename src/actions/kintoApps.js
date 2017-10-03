import { formSubmitted } from './pageOptions'
import { push } from 'react-router-redux'

import { isVersionEqual, textToObject } from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'

export const FETCH_KINTO_APPS = 'FETCH_KINTO_APPS'
export const RECEIVE_KINTO_APPS = 'RECEIVE_KINTO_APPS'
export const RECEIVE_KINTO_APP = 'RECEIVE_KINTO_APP'

export const kintoAppsFetch = () => ({ type: FETCH_KINTO_APPS })

export const kintoAppsReceive = data => ({
  type: RECEIVE_KINTO_APPS,
  data
})

export const kintoAppReceive = (id, data) => ({
  type: RECEIVE_KINTO_APP,
  id,
  data
})

export const fetchKintoApp = (id, ver) => (dispatch, getState) => {
  const state = getState()
  const kintoApp = state.kintoApps.byId[id]

  if (
    kintoApp &&
    kintoApp.version &&
    isVersionEqual(ver, kintoApp.version) &&
    kintoApp.lastFetch &&
    isRecent(kintoApp.lastFetch)
  ) {
    return
  }

  const appData = {
    id: id,
    name: 'Single App All Alone',
    color: 'lapis',
    version: textToObject(ver),
    versions: [
      {
        major: 2,
        minor: 1,
        revision: 0,
        state: 'PENDING'
      },
      {
        major: 1,
        minor: 2,
        revision: 0,
        state: 'PUBLISHED'
      },
      {
        major: 1,
        minor: 1,
        revision: 0,
        state: 'PUBLISHED'
      }
    ]
  }
  dispatch(kintoAppsFetch())
  return Promise.resolve(appData).then(data => {
    dispatch(kintoAppReceive(id, data))
  })
}

export const fetchKintoApps = () => dispatch => {
  const testData = [
    {
      id: '1',
      name: 'Special Snowflake KintoApp',
      color: 'lapis',
      versions: [
        {
          major: 2,
          minor: 1,
          revision: 0,
          state: 'PENDING'
        },
        {
          major: 1,
          minor: 2,
          revision: 0,
          state: 'PUBLISHED'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'PUBLISHED'
        }
      ]
    },
    {
      id: '2',
      name: "Your Mum's KintoApp",
      color: 'blue',
      versions: [
        {
          major: 1,
          minor: 1,
          revision: 0,
          state: 'PENDING'
        }
      ]
    },
    {
      id: '3',
      name: 'Sausages!',
      color: 'gray',
      versions: [
        {
          major: 1,
          minor: 1,
          revision: 0,
          state: 'PUBLISHED'
        },
        {
          major: 1,
          minor: 2,
          revision: 0,
          state: 'PUBLISHED'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'PUBLISHED'
        }
      ]
    },
    {
      id: '4',
      name: 'No Country for KintoApps',
      color: 'purple',
      versions: [
        {
          major: 1,
          minor: 1,
          revision: 0,
          state: 'PUBLISHED'
        }
      ]
    },
    {
      id: '5',
      name: 'I has KintoApp',
      color: 'green',
      versions: [
        {
          major: 1,
          minor: 1,
          revision: 0,
          state: 'PUBLISHED'
        }
      ]
    },
    {
      id: '6',
      name: 'Such App Much Kinto',
      color: 'orange',
      versions: [
        {
          major: 1,
          minor: 1,
          revision: 0,
          state: 'PUBLISHED'
        }
      ]
    }
  ]
  dispatch(kintoAppsFetch())
  return Promise.resolve(testData).then(data => {
    dispatch(kintoAppsReceive(data))
    if (data.length === 0) {
      this.props.push('/app/dashboard/kintoapps/create')
    }
  })
}

export const kintoAppCreate = data => dispatch => {
  return Promise.resolve('success').then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoapps/list'))
  })
}

export const updateKintoApp = data => dispatch => {
  return Promise.resolve('success').then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoapps/list'))
  })
}
