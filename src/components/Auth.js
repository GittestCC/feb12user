import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class Auth extends Component {
  static propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    axios.interceptors.request.use(config => {
      if (this.props.token) {
        config.headers.Authorization = `Bearer ${this.props.token}`
      }
      return config
    })
    axios.interceptors.response.use(
      response => {
        const token = response.headers['grpc-metadata-authorization']
        const data = response.data || {}
        if (token) {
          this.props.setToken(token)
        }
        if (data.errors) {
          if (data.errors.error) {
            data.errors._error = data.errors.error
            delete data.errors.error
          }
          return Promise.reject(data)
        }
        return data
      },
      error => {
        // Do something with response error
        if (error && error.response && error.response.status === 403) {
          // remove token info
          this.props.logout()
          this.props.navigateTo('/login')
        }
        // Throw errr again (may be need for some other catch)
        return Promise.reject(error)
      }
    )
  }

  render() {
    return null
  }
}

export default Auth
