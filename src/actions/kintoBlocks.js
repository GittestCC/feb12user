import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { formSubmitted } from './pageOptions'
import {
  getManageUrlForKintoBlock,
  isVersionEqual,
  textToObject
} from '../helpers/versionHelper'
import { isRecent } from '../helpers/dateHelper'

export const FETCH_KINTO_BLOCKS = 'FETCH_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCKS = 'RECEIVE_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCK = 'RECEIVE_KINTO_BLOCK'
export const CREATE_VERSION_KINTO_BLOCK = 'CREATE_VERSION_KINTO_BLOCK'
export const RECEIVE_KINTO_BLOCK_DEPENDENCIES =
  'RECEIVE_KINTO_BLOCK_DEPENDENCIES'

export const kintoBlocksFetch = () => ({ type: FETCH_KINTO_BLOCKS })
export const kintoBlocksReceive = data => ({ type: RECEIVE_KINTO_BLOCKS, data })

export const kintoBlockReceiveDependencies = data => ({
  type: RECEIVE_KINTO_BLOCK_DEPENDENCIES,
  data: data.data,
  metadata: data.metadata
})

export const kintoBlockReceive = (id, data) => ({
  type: RECEIVE_KINTO_BLOCK,
  id,
  data
})

export const kintoBlockCreateVersion = (id, data) => ({
  type: CREATE_VERSION_KINTO_BLOCK,
  id,
  data
})

export const fetchKintoBlocks = () => dispatch => {
  const testData = [
    {
      id: 1,
      name: 'Kintoblock Name',
      color: 'lapis',
      versions: [
        {
          major: 1,
          minor: 1,
          revision: 0,
          state: 'PENDING'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        },
        {
          major: 1,
          minor: 0,
          revision: 0,
          state: 'DRAFT'
        }
      ]
    },
    {
      id: 2,
      name: 'Kintoblock Name 2',
      color: 'blue',
      versions: [
        {
          major: 0,
          minor: 1,
          revision: 0,
          state: 'PUBLISHED'
        }
      ]
    },
    {
      id: 3,
      name: 'Kintoblock Name 3',
      color: 'gray',
      versions: [
        {
          major: 0,
          minor: 2,
          revision: 1,
          state: 'DRAFT'
        }
      ]
    }
  ]
  dispatch(kintoBlocksFetch())
  return Promise.resolve(testData).then(data => {
    dispatch(kintoBlocksReceive(data))
  })
}

// checks if the last fetched kintoblock has the same ver and is fetched recently
// if that is the case, then don't do anything
export const fetchKintoBlock = (id, ver) => (dispatch, getState) => {
  const state = getState()
  const kintoBlock = state.kintoBlocks.byId[id]
  if (
    kintoBlock &&
    kintoBlock.version &&
    isVersionEqual(ver, kintoBlock.version) &&
    kintoBlock.lastFetch &&
    isRecent(kintoBlock.lastFetch)
  ) {
    return
  }

  const testData = {
    id: 1,
    name: 'Kintoblock Name',
    color: 'lapis',
    version: textToObject(ver),
    versions: [
      {
        major: 1,
        minor: 1,
        revision: 0,
        state: 'PENDING'
      },
      {
        major: 0,
        minor: 1,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 0,
        minor: 2,
        revision: 1,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      }
    ]
  }
  dispatch(kintoBlocksFetch())
  return Promise.resolve(testData).then(data => {
    dispatch(kintoBlockReceive(id, data))
  })
}

export const kintoBlockCreate = data => dispatch => {
  return Promise.resolve('success').then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoblocks/list'))
  })
}

export const createVersionKintoBlock = (id, data) => dispatch => {
  let testData = {
    id: 1,
    name: 'Kintoblock Name',
    version: data.versionData,
    color: 'lapis',
    versions: [
      {
        major: 1,
        minor: 1,
        revision: 0,
        state: 'PENDING'
      },
      {
        major: 0,
        minor: 1,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 0,
        minor: 2,
        revision: 1,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      },
      {
        major: 1,
        minor: 0,
        revision: 0,
        state: 'DRAFT'
      }
    ]
  }
  testData.versions.push(data.versionData)
  return Promise.resolve(testData).then(result => {
    if (result.errors) {
      throw new SubmissionError(result.errors)
    }
    dispatch(kintoBlockCreateVersion(id, result))
    dispatch(push(getManageUrlForKintoBlock(id, data.versionData)))
  })
}

export const searchKintoBlocks = q => () => {
  // const url = `/kintoblocks/search?name=${q}&limit=10`
  const result = [
    {
      id: '7',
      name: 'cool kintoblock',
      type: 'KINTOBLOCK',
      version: '0.1.2'
    },
    {
      id: '8',
      name: 'cool service 1',
      type: 'SERVICE',
      version: '0.1.2'
    }
  ]
  return Promise.resolve(result).then(r => {
    return {
      options: r.map(k => ({
        ...k,
        label: k.name
      }))
    }
  })
}

export const fetchKintoBlockDependenciesData = (id, ver) => dispatch => {
  //const url = `/kintoblocks/${id}/versions/${ver}/dependencydata`
  const testData = {
    data: {
      id: id,
      version: textToObject(ver)
    },
    metadata: {
      dependencies: {
        '7': {
          name: 'cool kintoblock',
          type: 'KINTOBLOCK',
          description: 'Coolzor!!',
          versions: [
            { major: 0, minor: 1, revision: 0 },
            { major: 0, minor: 1, revision: 2 }
          ]
        },
        '8': {
          name: 'cool service 1',
          type: 'SERVICE',
          description: 'cool service',
          versions: [
            { major: 0, minor: 1, revision: 0 },
            { major: 0, minor: 1, revision: 2 }
          ]
        }
      }
    }
  }
  return Promise.resolve(testData).then(result => {
    dispatch(kintoBlockReceiveDependencies(result))
    return result.data
  })
}
