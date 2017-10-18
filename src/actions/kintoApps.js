import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

import { formSubmitted } from './pageOptions'
import {
  isVersionEqual,
  getManageUrlForKintoApp
} from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'

export const FETCH_KINTO_APPS = 'FETCH_KINTO_APPS'
export const RECEIVE_KINTO_APPS = 'RECEIVE_KINTO_APPS'
export const RECEIVE_KINTO_APP = 'RECEIVE_KINTO_APP'
export const CREATE_VERSION_KINTO_APP = 'CREATE_VERSION_KINTO_APP'
export const RECIEVE_KINTO_APP_ENVIRONMENTS = 'RECIEVE_KINTO_APP_ENVIRONMENTS'
export const NEW_ENVIRONMENT_RECEIVE = 'NEW_ENVIRONMENT_RECEIVE'
export const KINTO_APP_ENVIRONMENT_UPDATE = 'KINTO_APP_ENVIRONMENT_UPDATE'
export const KINTO_APP_ENVIRONMENT_LIST_REORDER =
  'KINTO_APP_ENVIRONMENT_LIST_REORDER'

export const kintoAppCreateVersion = (id, data) => ({
  type: CREATE_VERSION_KINTO_APP,
  id,
  data
})

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

export const kintoAppEnvironmentsReceive = (id, data) => ({
  type: RECIEVE_KINTO_APP_ENVIRONMENTS,
  id,
  data: data.data
})

export const kintoAppEnvironmentListReorder = (id, oldIndex, newIndex) => ({
  type: KINTO_APP_ENVIRONMENT_LIST_REORDER,
  id,
  oldIndex: oldIndex,
  newIndex: newIndex
})

export const newEnvironmentReceive = (id, data) => ({
  type: NEW_ENVIRONMENT_RECEIVE,
  id,
  data: data.data
})

export const updateAppEnvironment = (id, result) => ({
  type: KINTO_APP_ENVIRONMENT_UPDATE,
  id,
  data: result.data
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
  dispatch(kintoAppsFetch())
  return axios.get(`/kintoapps/${id}/versions/${ver}`).then(data => {
    return dispatch(kintoAppReceive(id, data))
  })
}

export const fetchKintoApps = () => dispatch => {
  dispatch(kintoAppsFetch())
  return axios.get('/kintoapps/all').then(result => {
    if (isEmpty(result.data)) {
      dispatch(push('/app/dashboard/kintoapps/create'))
    } else {
      dispatch(kintoAppsReceive(result))
    }
  })
}

export const createVersionKintoApp = (id, data) => dispatch => {
  return axios.post(`/kintoapps/${id}/versions`, data).then(result => {
    if (result.errors) {
      throw new SubmissionError(result.errors)
    }
    dispatch(kintoAppCreateVersion(id, result.newVersion))
    dispatch(push(getManageUrlForKintoApp(id, data.version)))
  })
}

export const createKintoApp = data => dispatch => {
  return axios.post('/kintoapps/create', data).then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoapps/list'))
  })
}

export const updateKintoApp = (id, ver, data) => dispatch => {
  return axios.put(`/kintoapps/${id}/versions/${ver}`, data).then(result => {
    dispatch(formSubmitted())
    dispatch(push(`/app/dashboard/kintoapps/${id}/versions/${ver}`))
  })
}

export const getKintoAppEnvironments = id => dispatch => {
  // ****** I HAVE LEFT THIS HERE BECAUSE I NEED IT FOR THE EXPAND TASK! *******
  // const testData = {
  //   data: [
  //     {
  //       id: '10',
  //       name: 'SAUSAGES',
  //       releases: [
  //         {
  //           version: {
  //             major: 1,
  //             minor: 2,
  //             build: 4
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-10T04:45:14.212753500Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T04:45:14.212753500Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T04:45:14.212753500Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T04:45:14.212753500Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 3
  //           },
  //           state: 'FAILED',
  //           completionTime: '2017-10-10T02:45:14.215264Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T02:45:14.215264Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T02:45:14.215264Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T02:45:14.215264Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 2
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-10T01:45:14.215272Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T01:45:14.215272Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T01:45:14.215272Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T01:45:14.215272Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             build: 1
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-10T00:45:14.215273100Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T00:45:14.215273100Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T00:45:14.215273100Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T00:45:14.215273100Z'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: '1',
  //       name: 'DEV',
  //       releases: [
  //         {
  //           version: {
  //             major: 1,
  //             minor: 2,
  //             build: 4
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-10T04:45:14.212753500Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T04:45:14.212753500Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T04:45:14.212753500Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T04:45:14.212753500Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 3
  //           },
  //           state: 'FAILED',
  //           completionTime: '2017-10-10T02:45:14.215264Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T02:45:14.215264Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T02:45:14.215264Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T02:45:14.215264Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 2
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-10T01:45:14.215272Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T01:45:14.215272Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T01:45:14.215272Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T01:45:14.215272Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             build: 1
  //           },
  //           state: 'SHUTDOWN',
  //           completionTime: '2017-10-10T00:45:14.215273100Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-10T00:45:14.215273100Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-10T00:45:14.215273100Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-10T00:45:14.215273100Z'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: '2',
  //       name: 'STAGE',
  //       releases: [
  //         {
  //           version: {
  //             major: 1,
  //             minor: 2,
  //             build: 4
  //           },
  //           state: 'SHUTDOWN',
  //           completionTime: '2017-10-08T04:45:14.215295Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-08T04:45:14.215295Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-08T04:45:14.215295Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-08T04:45:14.215295Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 3
  //           },
  //           state: 'FAILED',
  //           completionTime: '2017-10-08T02:45:14.215297100Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-08T02:45:14.215297100Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-08T02:45:14.215297100Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-08T02:45:14.215297100Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 2
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-08T01:45:14.215298200Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-08T01:45:14.215298200Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-08T01:45:14.215298200Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-08T01:45:14.215298200Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             build: 1
  //           },
  //           state: 'TESTING',
  //           completionTime: '2017-10-08T00:45:14.215298600Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-08T00:45:14.215298600Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-08T00:45:14.215298600Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-08T00:45:14.215298600Z'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: '3',
  //       name: 'PRE-PROD'
  //     },
  //     {
  //       id: '4',
  //       name: 'PROD',
  //       releases: [
  //         {
  //           version: {
  //             major: 1,
  //             minor: 2,
  //             build: 4
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-01T04:45:14.215300100Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-01T04:45:14.215300100Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-01T04:45:14.215300100Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-01T04:45:14.215300100Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 3
  //           },
  //           state: 'FAILED',
  //           completionTime: '2017-10-01T02:45:14.215300800Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-01T02:45:14.215300800Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-01T02:45:14.215300800Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-01T02:45:14.215300800Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             revision: 1,
  //             build: 2
  //           },
  //           state: 'SUCCESS',
  //           completionTime: '2017-10-01T01:45:14.215301500Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-01T01:45:14.215301500Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-01T01:45:14.215301500Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-01T01:45:14.215301500Z'
  //             }
  //           ]
  //         },
  //         {
  //           version: {
  //             major: 1,
  //             build: 1
  //           },
  //           state: 'FAILED',
  //           completionTime: '2017-10-01T00:45:14.215302200Z',
  //           steps: [
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'BUILD',
  //               completionTime: '2017-10-01T00:45:14.215302200Z'
  //             },
  //             {
  //               state: 'SUCCESS',
  //               stepName: 'TEST',
  //               completionTime: '2017-10-01T00:45:14.215302200Z'
  //             },
  //             {
  //               state: 'FAILED',
  //               stepName: 'DEPLOY',
  //               completionTime: '2017-10-01T00:45:14.215302200Z'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
  dispatch(kintoAppsFetch())
  return axios.get(`/kintoapps/${id}/environments`).then(result => {
    if (isEmpty(result.data)) {
      dispatch(push('/app/dashboard/kintoapps/list'))
    } else {
      // result = testData *** AND THIS ***
      dispatch(kintoAppEnvironmentsReceive(id, result))
    }
  })
}

export const addNewEnvironment = (id, data) => dispatch => {
  dispatch(kintoAppsFetch())
  return axios.post(`/kintoapps/${id}/environments`, data).then(result => {
    dispatch(formSubmitted())
    dispatch(newEnvironmentReceive(id, result))
  })
}

export const deployEnvironment = (id, data, envName) => dispatch => {
  dispatch(kintoAppsFetch())
  return axios
    .put(`/kintoapps/${id}/environments/${envName}/deploy`, data)
    .then(result => {
      dispatch(formSubmitted())
      dispatch(updateAppEnvironment(id, result))
    })
}

export const cancelDeployment = id => dispatch => {
  // the API does not have this functionality yet
  dispatch(kintoAppsFetch())
  dispatch(push(`/app/dashboard/kintoapps/${id}/environments`))
}

export const shutDownEnvironment = (id, envName, data) => dispatch => {
  dispatch(kintoAppsFetch())
  return axios
    .put(`/kintoapps/${id}/environments/${envName}/shutdown`, data)
    .then(() => {
      dispatch(formSubmitted())
      dispatch(push(`/app/dashboard/kintoapps/${id}/environments`))
    })
}

export const reorderEnvironments = (id, oldIndex, newIndex) => (
  dispatch,
  getState
) => {
  dispatch(kintoAppsFetch())
  dispatch(kintoAppEnvironmentListReorder(id, oldIndex, newIndex))
  const state = getState()
  const sortedEnvironmentsIds = state.kintoApps.byId[id].environments.map(
    e => e.id
  )
  return axios.put(`/kintoapps/${id}/environments/order`, {
    data: sortedEnvironmentsIds
  })
}
