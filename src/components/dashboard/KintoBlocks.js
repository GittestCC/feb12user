import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import KintoBlocksListContainer from '../../containers/dashboard/kintoBlocks/KintoBlocksListContainer'
import KintoBlockManageContainer from '../../containers/dashboard/kintoBlocks/KintoBlockManageContainer'
import KintoBlockCreateContainer from '../../containers/dashboard/kintoBlocks/KintoBlockCreateContainer'

class Kintoblocks extends Component {
  static propTypes = {
    fetchKintoBlocks: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    isLoaded: false,
    lastFetched: null
  }

  componentDidMount() {
    this.props.fetchKintoBlocks().then(() => {
      this.setState({ isLoaded: true, lastFetched: new Date() })
    })
  }

  render() {
    const { match } = this.props
    const { isLoaded, lastFetched } = this.state
    return isLoaded ? (
      <div className="kintoblocks-master-container">
        <Route
          path={`${match.url}/list`}
          render={props => (
            <KintoBlocksListContainer lastFetched={lastFetched} {...props} />
          )}
        />
        <Route
          path={`${match.url}/create`}
          component={KintoBlockCreateContainer}
        />
        <Route
          path={`${match.url}/:id/versions/:ver/:type`}
          component={KintoBlockManageContainer}
        />
      </div>
    ) : null
  }
}

export default Kintoblocks
