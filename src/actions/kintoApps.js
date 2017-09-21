import { formSubmitted } from './pageOptions'
import { push } from 'react-router-redux'

export const FETCH_KINTO_APPS = 'FETCH_KINTO_APPS'
export const RECEIVE_KINTO_APPS = 'RECEIVE_KINTO_APPS'

export const kintoAppsFetch = () => ({ type: FETCH_KINTO_APPS })
export const kintoAppsReceive = data => ({
  type: RECEIVE_KINTO_APPS,
  data
})

export const fetchKintoApps = callback => dispatch => {
  const testData = [
    {
      id: 1,
      name: 'Kinto App Name',
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
      id: 2,
      name: 'Awesome Long Name KintoApp',
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
      id: 3,
      name: 'Kinto App Name',
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
      id: 4,
      name: 'Kinto App Name',
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
      id: 5,
      name: 'Kinto App Name',
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
      id: 6,
      name: 'Kinto App Name',
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
    callback(data)
  })
}

export const kintoAppsCreate = data => dispatch => {
  return Promise.resolve('success').then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoapps/list'))
  })
}
