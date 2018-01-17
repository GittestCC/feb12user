import { Component } from 'react'
import PropTypes from 'prop-types'
import { trackPageChange } from '../helpers/analyticsHelper'

class Analytics extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { pathname, search } = this.props.location
    trackPageChange(pathname, search)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location
    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      trackPageChange(nextProps.location.pathname, nextProps.location.search)
    }
  }

  render() {
    return null
  }
}

export default Analytics
