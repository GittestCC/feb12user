import { push } from 'react-router-redux'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import { formSubmitted } from './pageOptions'
import { getPageUrl, getServerUrl } from '../helpers/urlHelper'
import { KINTOAPPS } from '../constants/backendMicroservices'
import { pages } from '../constants/pages'
import { TAG } from '../constants/version'

export const RECEIVE_KINTO_APPS = 'RECEIVE_KINTO_APPS'
export const RECEIVE_KINTO_APP = 'RECEIVE_KINTO_APP'
export const ADD_KINTO_APP = 'ADD_KINTO_APP'
export const UPDATE_KINTO_APP = 'UPDATE_KINTO_APP'
export const CREATE_VERSION_KINTO_APP = 'CREATE_VERSION_KINTO_APP'
export const RECIEVE_KINTO_APP_ENVIRONMENTS = 'RECIEVE_KINTO_APP_ENVIRONMENTS'
export const RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG =
  'RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG'
export const NEW_ENVIRONMENT_RECEIVE = 'NEW_ENVIRONMENT_RECEIVE'
export const KINTO_APP_ENVIRONMENT_UPDATE = 'KINTO_APP_ENVIRONMENT_UPDATE'
export const ADD_TAG = 'ADD_TAG'
export const KINTO_APP_ENVIRONMENT_LOG_UPDATE =
  'KINTO_APP_ENVIRONMENT_LOG_UPDATE'
export const KINTO_APP_ENVIRONMENT_LIST_REORDER =
  'KINTO_APP_ENVIRONMENT_LIST_REORDER'
export const KINTO_APP_CHANGELOG_RECEIVE = 'KINTO_APP_CHANGELOG_RECEIVE'

export const kintoAppUpdate = (id, data) => ({
  type: UPDATE_KINTO_APP,
  id,
  data
})

export const kintoAppAdd = (id, data, metadata) => ({
  type: ADD_KINTO_APP,
  id,
  data,
  metadata
})
export const kintoAppCreateVersion = (id, data) => ({
  type: CREATE_VERSION_KINTO_APP,
  id,
  data
})

export const kintoAppsReceive = response => ({
  type: RECEIVE_KINTO_APPS,
  data: response.data,
  metadata: response.metadata
})

export const kintoAppReceive = (id, data, metadata, willOverwrite) => ({
  type: RECEIVE_KINTO_APP,
  id,
  data,
  metadata,
  willOverwrite
})

export const kintoAppEnvironmentsReceive = (id, data) => ({
  type: RECIEVE_KINTO_APP_ENVIRONMENTS,
  id,
  data
})

export const kintoAppDependenciesConfigReceive = (id, ver, envId, data) => ({
  type: RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG,
  id,
  envId,
  ver,
  data
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
  data
})

export const addNewTag = (id, name, versionType) => ({
  type: ADD_TAG,
  name,
  versionType,
  id
})

export const appEnvironmentUpdate = (id, data) => ({
  type: KINTO_APP_ENVIRONMENT_UPDATE,
  id,
  data
})

export const environmentLogsReceive = (id, envId, releaseVersion, data) => ({
  type: KINTO_APP_ENVIRONMENT_LOG_UPDATE,
  id,
  envId,
  releaseVersion,
  data
})

export const changeLogReceive = (id, oldVersion, newVersion, data) => ({
  type: KINTO_APP_CHANGELOG_RECEIVE,
  id,
  oldVersion,
  newVersion,
  data
})

//TODO try to break down into multiple reducer so we wont need merging
export const fetchKintoApp = (id, ver, willOverwrite = false) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/versions/${ver}`
      )
    )
    .then(response => {
      return dispatch(
        kintoAppReceive(id, response.data, response.metadata, willOverwrite)
      )
    })
}

export const fetchKintoApps = () => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces

  const kintoAppCreateUrl = getPageUrl(pages.dashboardKintoAppsCreate, {
    workspaceId: selectedWorkspace
  })
  return axios
    .get(getServerUrl(KINTOAPPS, `/${selectedWorkspace}/kintoapps`))
    .then(response => {
      if (isEmpty(response.data)) {
        dispatch(push(kintoAppCreateUrl))
      } else {
        dispatch(kintoAppsReceive(response))
      }
    })
}

export const fetchKintoAppDependenciesConfig = (id, ver, envId) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .get(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/versions/${ver}/config/${envId}`
      )
    )
    .then(response => {
      //TODO: a server side fix for initing params to empty array
      response.data.forEach(i => {
        if (!i.params) {
          i.params = []
        }
      })
      dispatch(kintoAppDependenciesConfigReceive(id, ver, envId, response.data))
    })
}

export const createKintoApp = data => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const kintoAppListUrl = getPageUrl(pages.dashboardKintoAppsList, {
    workspaceId: selectedWorkspace
  })
  return axios
    .post(getServerUrl(KINTOAPPS, `/${selectedWorkspace}/kintoapps`), data)
    .then(({ data, metadata }) => {
      dispatch(formSubmitted())
      dispatch(kintoAppAdd(data.id, data, metadata))
      dispatch(push(kintoAppListUrl))
    })
}

export const updateKintoApp = (id, ver, data) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/versions/${ver}`
      ),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(kintoAppUpdate(id, response.data))
    })
}

export const updateAppDependenciesConfigData = (id, ver, env, data) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/versions/${ver}/config/${env}`
      ),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
    })
}

export const getKintoAppEnvironments = id => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const kintoAppListUrl = getPageUrl(pages.dashboardKintoAppsList, {
    workspaceId: selectedWorkspace
  })
  return axios
    .get(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/environments`
      )
    )
    .then(response => {
      if (isEmpty(response.data)) {
        dispatch(push(kintoAppListUrl))
      } else {
        dispatch(kintoAppEnvironmentsReceive(id, response.data))
      }
    })
}

export const addNewEnvironment = (id, data) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .post(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/environments`
      ),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(newEnvironmentReceive(id, response.data))
    })
}

export const updateAppEnvironment = (id, envId, data) => (
  dispatch,
  getState
) => {
  const { selectedWorkspace } = getState().workspaces
  return axios
    .put(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/environments/${envId}`
      ),
      data
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(appEnvironmentUpdate(id, response.data))
    })
}

export const deployEnvironment = (id, envId, data) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const environmentEditUrl = getPageUrl(
    pages.dashboardKintoAppsEnvironmentEdit,
    {
      id,
      workspaceId: selectedWorkspace,
      envId
    }
  )
  return axios
    .post(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/environments/${envId}/deploy`
      ),
      data
    )
    .then(response => {
      if (data.createNewVersion) {
        dispatch(addNewTag(id, data.version.name, TAG))
      }
      dispatch(formSubmitted())
      dispatch(appEnvironmentUpdate(id, response.data))
      dispatch(push(environmentEditUrl))
    })
}

export const cancelDeployment = id => dispatch => {
  // TODO: the API does not have this functionality yet
  /*
  dispatch(push(`/app/dashboard/kintoapps/${id}/environments`))
  */
}

export const shutDownEnvironment = (id, envId) => (dispatch, getState) => {
  const { selectedWorkspace } = getState().workspaces
  const environmentsListUrl = getPageUrl(pages.dashboardKintoAppsEnvironments, {
    id,
    workspaceId: selectedWorkspace
  })
  return axios
    .post(
      getServerUrl(
        KINTOAPPS,
        `/${selectedWorkspace}/kintoapps/${id}/environments/${envId}/shutdown`
      )
    )
    .then(response => {
      dispatch(formSubmitted())
      dispatch(push(environmentsListUrl))
      dispatch(appEnvironmentUpdate(id, response.data))
    })
}

export const reorderEnvironments = (id, oldIndex, newIndex) => (
  dispatch,
  getState
) => {
  dispatch(kintoAppEnvironmentListReorder(id, oldIndex, newIndex))
  const state = getState()
  const sortedEnvironmentsIds = state.kintoApps.byId[id].environments.map(
    e => e.id
  )
  return axios.put(
    getServerUrl(KINTOAPPS, `/kintoapps/${id}/environments/order`),
    {
      data: sortedEnvironmentsIds
    }
  )
}

//TODO: mock call for get environment logs kintoapps.api.kintocloud.com/(ws-id)/kintoapps/(app-id)/environments/(env-name)/(app-version)/logs

export const getEnvironmentLogs = (id, envId, releaseVersion) => dispatch => {
  const dummyRows = [
    {
      severity: 'info',
      responsecode: 504,
      kintoblockName: 'KintoBlock Name',
      timestamp: moment().subtract(2, 'days'),
      versionInfo: 'Development #45IEDFR',
      requestJson: "{ 'name': 'Raven' }",
      responseJson: '{ Donec congue lorem a molestie bibendum. }'
    },
    {
      severity: 'debug',
      responsecode: 200,
      kintoblockName: 'All The KB',
      timestamp: moment(),
      versionInfo: '2.0.1',
      requestJson: "{ 'name': 'Raven' }",
      responseJson: '{ Donec congue lorem a molestie bibendum. }'
    },
    {
      severity: 'fatal',
      responsecode: 500,
      kintoblockName: 'All The KB',
      timestamp: moment(),
      versionInfo: 'Production #69E84E2',
      requestJson: "{ 'name': 'Raven' }",
      responseJson: '{ Donec congue lorem a molestie bibendum. }'
    },
    {
      severity: 'warning',
      responsecode: 300,
      kintoblockName: "Nadeem's Mum",
      timestamp: moment().add(1, 'days'),
      versionInfo: '0.9.6',
      requestJson: "{ 'name': 'Raven' }",
      responseJson: '{ Donec congue lorem a molestie bibendum. }'
    }
  ]
  //TODO: return axos.put(`/kintoapps/${id}/environments/${envName}/${releaseVersion}/logs`)
  return Promise.resolve({ data: dummyRows }).then(response => {
    dispatch(environmentLogsReceive(id, envId, releaseVersion, response.data))
  })
}

export const getKintoAppChangelogs = (
  id,
  oldVersion,
  newVersion
) => dispatch => {
  const response = {
    modifiedBlocks: [
      {
        blockId: '1',
        blockName: 'Super Wordpress',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'master',
          note: 'No builds yet...',
          type: 'BRANCH'
        },
        changes: [
          {
            type: 'VERSION',
            oldValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: 'master',
              note: 'No builds yet...',
              type: 'BRANCH'
            },
            newValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: 'production',
              note: 'No builds yet...',
              type: 'BRANCH'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'modified value',
              value: 'abc'
            },
            newValue: {
              key: 'modified value',
              value: 'def'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            newValue: {
              key: 'Added param',
              value: 'QW12ER'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'removed param',
              value: 'UI12UI'
            }
          },
          {
            type: 'HARDWARE_REQUIREMENTS',
            oldValue: {
              key: 'memory limits',
              value: '64MB'
            },
            newValue: {
              key: 'memory limits',
              value: '128MB'
            }
          },
          {
            type: 'HARDWARE_REQUIREMENTS',
            oldValue: {
              key: 'cpu limits',
              value: '400 m'
            }
          },
          {
            type: 'HARDWARE_REQUIREMENTS',
            newValue: {
              key: 'dedicated cpus',
              value: 'Yes'
            }
          }
        ]
      },
      {
        blockId: '1',
        blockName: 'All The Block',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'master',
          note: 'No builds yet...',
          type: 'BRANCH'
        },
        changes: [
          {
            type: 'VERSION',
            oldValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: 'master',
              note: 'No builds yet...',
              type: 'BRANCH'
            },
            newValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: '0.1.1',
              note: 'No builds yet...', //commit message
              type: 'TAG'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'modified value',
              value: 'abc'
            },
            newValue: {
              key: 'modified value',
              value: 'def'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            newValue: {
              key: 'Added param',
              value: 'QW12ER'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'removed param',
              value: 'UI12UI'
            }
          }
        ]
      },
      {
        blockId: '1',
        blockName: 'More Marquise Please',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'master',
          note: 'No builds yet...',
          type: 'BRANCH'
        },
        changes: [
          {
            type: 'VERSION',
            oldValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: 'lalalalalaitslateaf',
              note: 'No builds yet...',
              type: 'BRANCH'
            },
            newValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: '0.1.1',
              note: 'New Commit Message', //commit message
              type: 'TAG'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'modified value',
              value: 'abc'
            },
            newValue: {
              key: 'modified value',
              value: 'def'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            newValue: {
              key: 'Added param',
              value: 'QW12ER'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'removed param',
              value: 'UI12UI'
            }
          }
        ]
      },
      {
        blockId: '1',
        blockName: 'Tag Name Change',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'master',
          note: 'No builds yet...',
          type: 'BRANCH'
        },
        changes: [
          {
            type: 'VERSION',
            oldValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: '1.1.1',
              note: 'No builds yet...',
              type: 'TAG'
            },
            newValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: '1.1.2',
              note: 'No builds yet...',
              type: 'TAG'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'modified value',
              value: 'abc'
            },
            newValue: {
              key: 'modified value',
              value: 'def'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            newValue: {
              key: 'Added param',
              value: 'QW12ER'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'removed param',
              value: 'UI12UI'
            }
          }
        ]
      },
      {
        blockId: '1',
        blockName: 'New Tag Example',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'master',
          note: 'No builds yet...',
          type: 'BRANCH'
        },
        changes: [
          {
            type: 'VERSION',
            newValue: {
              lastUpdated: '2018-01-15T10:44:53.226533200Z',
              name: '1.1.2',
              note: 'No builds yet...',
              type: 'TAG'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'modified value',
              value: 'abc'
            },
            newValue: {
              key: 'modified value',
              value: 'def'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            newValue: {
              key: 'Added param',
              value: 'QW12ER'
            }
          },
          {
            type: 'CUSTOM_PARAM',
            oldValue: {
              key: 'removed param',
              value: 'UI12UI'
            }
          }
        ]
      }
    ],
    newBlocks: [
      {
        blockId: '123',
        blockName: 'P5',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: '1.1.1 (4)',
          note: 'No builds yet...',
          type: 'TAG'
        }
      },
      {
        blockId: '456',
        blockName: 'Nier',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: '2.3.1 (2)',
          note: 'No builds yet...',
          type: 'TAG'
        }
      }
    ],
    deletedBlocks: [
      {
        blockId: '123',
        blockName: 'Hatoful Boyfriend',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'master',
          note: 'No builds yet...',
          type: 'BRANCH'
        }
      },
      {
        blockId: '234',
        blockName: 'Overwatch',
        blockVersion: {
          lastUpdated: '2018-01-15T10:44:53.226533200Z',
          name: 'dev',
          note: 'No builds yet...',
          type: 'BRANCH'
        }
      }
    ]
  }

  //TODO: return axos.put(`/kintoapps/${id}/changelogs?oldVersion=${oldVersion}&newVersion=${newVersion}`)
  return Promise.resolve({ data: response }).then(res => {
    dispatch(changeLogReceive(id, oldVersion, newVersion, res.data))
  })
}
