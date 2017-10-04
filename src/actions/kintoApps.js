import { formSubmitted } from './pageOptions'
import { isVersionEqual } from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'

export const FETCH_KINTO_APPS = 'FETCH_KINTO_APPS'
export const RECEIVE_KINTO_APPS = 'RECEIVE_KINTO_APPS'
export const RECEIVE_KINTO_APP = 'RECEIVE_KINTO_APP'

export const kintoAppsFetch = () => ({ type: FETCH_KINTO_APPS })

export const kintoAppsReceive = data => ({
  type: RECEIVE_KINTO_APPS,
  data: data.data,
  metadata: data.metadata
})

export const kintoAppReceive = (id, data) => ({
  type: RECEIVE_KINTO_APP,
  id,
  data: data.data,
  metadata: data.metadata
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
    data: {
      id: id,
      name: 'CoolApp',
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
      ],
      appDependencies: [
        {
          id: '1',
          version: { major: 1, minor: 2, revision: 3 }
        },
        {
          id: '5',
          version: { major: 1, minor: 2, revision: 3 }
        }
      ]
    },
    metadata: {
      dependencies: {
        '1': {
          name: 'test kintoblock',
          type: 'KINTOBLOCK',
          description: 'the greatest test kintoblock',
          versions: [
            { major: 2, minor: 2, revision: 3 },
            { major: 1, minor: 2, revision: 3 },
            { major: 3, minor: 2, revision: 3 }
          ],
          dependencies: [
            {
              id: '2',
              version: { major: 1, minor: 0, revision: 0 },
              residesIn: [{ major: 1, minor: 2, revision: 3 }]
            }
          ]
        },
        '2': {
          name: 'test 2 kintoblock',
          type: 'KINTOBLOCK',
          description: 'great dependency'
        },
        '5': {
          name: 'test 2 kintoblock',
          type: 'KINTOBLOCK',
          description: 'great dependency',
          versions: [
            { major: 1, minor: 0, revision: 0 },
            { major: 1, minor: 2, revision: 3 },
            { major: 1, minor: 8, revision: 0 }
          ]
        }
      }
    }
  }

  dispatch(kintoAppsFetch())
  return Promise.resolve(appData).then(data => {
    dispatch(kintoAppReceive(id, data))
  })
}

export const fetchKintoApps = () => dispatch => {
  const testData = {
    data: [
      {
        id: '1',
        name: 'CoolApp2',
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
        ],
        appDependencies: [
          {
            id: '1',
            version: { major: 1, minor: 2, revision: 3 }
          }
        ]
      }
    ],
    metadata: {
      dependencies: {
        1: {
          name: 'test kintoblock',
          type: 'KINTOBLOCK',
          description: 'the greatest test kintoblock',
          versions: [{ major: 1, minor: 2, revision: 3 }],
          dependencies: [
            {
              id: 2,
              version: { major: 1, minor: 0, revision: 0 },
              residesIn: [{ major: 1, minor: 2, revision: 3 }]
            }
          ]
        },
        2: {
          name: 'test 2 kintoblock',
          type: 'KINTOBLOCK',
          description: 'great dependency'
        }
      }
    }
  }
  dispatch(kintoAppsFetch())
  return Promise.resolve(testData).then(data => {
    dispatch(kintoAppsReceive(data))
    if (data.length === 0) {
      this.props.push('/app/dashboard/kintoapps/create')
    }
  })
}

export const createKintoApp = data => dispatch => {
  dispatch(formSubmitted())
  console.log('kintoapp created', data)
}

export const updateKintoApp = (id, ver, data) => dispatch => {
  dispatch(formSubmitted())
  console.log('kintoapp updated', id, ver, data)
}
