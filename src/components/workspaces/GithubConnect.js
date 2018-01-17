import { Component } from 'react'
import PropTypes from 'prop-types'

class GithubConnect extends Component {
  static propTypes = {
    connectGithub: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.connectGithub()
  }

  render() {
    return null
  }
}

export default GithubConnect
