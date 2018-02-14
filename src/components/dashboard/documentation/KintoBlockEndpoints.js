import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import Tooltip from 'rc-tooltip'
import iscroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import PropTypes from 'prop-types'
import KintoBlockEndpointDetailsContainer from '../../../containers/dashboard/documentation/KintoBlockEndpointDetailsContainer'
import { filterArray } from '../../../helpers/arrayHelper'

class KintoBlockEndpoints extends Component {
  static propTypes = {
    fetchKintoBlockForDocumentation: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    endpointList: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    firstEndpointId: PropTypes.string
  }

  state = {
    filterText: null
  }

  componentDidMount() {
    this.props.fetchKintoBlockForDocumentation(
      this.props.id,
      this.props.version,
      this.props.type
    )
    this.props.fetchKintoBlockDocumentation(this.props.id, this.props.buildId)
  }

  updateFilter = e => {
    this.setState({ filterText: e.target.value })
  }

  getFilteredList = endpoints => {
    return filterArray(endpoints, 'url', this.state.filterText)
  }

  render() {
    const { match, endpointList, isLoaded, firstEndpointId } = this.props
    return (
      <div className="endpoints-container">
        <div className="endpoint-title">
          <h3>endpoint documentation</h3>
        </div>

        <div className="endpoint-content">
          <div className="select-endpoint">
            <div className="top">
              <input
                type="search"
                onKeyUp={this.updateFilter}
                ref={input => {
                  this.filterInput = input
                }}
                placeholder="Search Endpoints..."
              />
            </div>
            <div className="bottom">
              <ReactIScroll
                iScroll={iscroll}
                options={{
                  scrollbars: true,
                  mouseWheel: true,
                  fadeScrollbars: true,
                  shrinkScrollbars: 'scale',
                  interactiveScrollbars: true
                }}
              >
                <ul className="unstyled-list">
                  {endpointList &&
                    this.getFilteredList(endpointList).map((ep, index) => (
                      <li key={index}>
                        <NavLink
                          to={`${match.url}/${ep.id}`}
                          activeClassName="selected-endpoint"
                        >
                          <Tooltip
                            placement="top"
                            overlay={
                              <span className={`type overlay ${ep.type}`}>
                                {ep.type} <span className="code">{ep.url}</span>
                              </span>
                            }
                            trigger="hover"
                            overlayClassName="endpoints"
                          >
                            <div>
                              <span className={`type ${ep.type}`}>
                                {ep.type}
                              </span>
                              <span className="code">{ep.url}</span>
                            </div>
                          </Tooltip>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </ReactIScroll>
            </div>
          </div>

          {isLoaded && (
            <Switch>
              <Route
                path={`${match.url}/:endpointId`}
                component={KintoBlockEndpointDetailsContainer}
              />
              <Redirect to={`${match.url}/${firstEndpointId}`} />
            </Switch>
          )}
        </div>
      </div>
    )
  }
}

export default KintoBlockEndpoints
