import { formSubmitted } from './pageOptions'
import { push } from 'react-router-redux'

export const FETCH_KINTO_BLOCKS = 'FETCH_KINTO_BLOCKS'
export const RECEIVE_KINTO_BLOCKS = 'RECEIVE_KINTO_BLOCKS'

export const kintoBlocksFetch = () => ({ type: FETCH_KINTO_BLOCKS })
export const kintoBlocksReceive = data => ({ type: RECEIVE_KINTO_BLOCKS, data })

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

export const kintoBlockCreate = data => dispatch => {
  return Promise.resolve('success').then(() => {
    dispatch(formSubmitted())
    dispatch(push('/app/dashboard/kintoblocks/list'))
  })
}
