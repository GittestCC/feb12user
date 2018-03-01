import axios from 'axios'
import { getServerUrl } from '../helpers/urlHelper'
import { AUTH } from '../constants/backendMicroservices'

export const RECEIVE_CURRENT_USER_INFO = 'RECEIVE_CURRENT_USER_INFO'

export const currentUserReceiveInfo = data => ({
  type: RECEIVE_CURRENT_USER_INFO,
  data
})

export const fetchCurrentUser = () => dispatch => {
  return axios.get(getServerUrl(AUTH, '/me')).then(response => {
    dispatch(currentUserReceiveInfo(response.data))
  })
}
