import { Component } from 'react'
import axios from 'axios'

class Auth extends Component {
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
        // TODO update the token if there is a new one
        return response
      },
      error => {
        // Do something with response error
        if (error.response.status === 401) {
          this.props.setToken(null)
          this.props.navigateTo('/login')
        }
        // Trow errr again (may be need for some other catch)
        return Promise.reject(error)
      }
    )
  }

  render() {
    return null
  }
}

export default Auth
