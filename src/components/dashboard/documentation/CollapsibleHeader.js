import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'

class CollapsibleHeader extends Component {
  static propTypes = {
    refreshScroll: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  state = {
    isExpanded: false
  }

  toggleVisibility = () => {
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded
      }),
      this.props.refreshScroll
    )
  }

  render() {
    const { title } = this.props
    return (
      <div
        className={`collapsible-header ${
          this.state.isExpanded ? 'expanded' : ''
        }`}
      >
        <div className="session-top">
          <h3>
            {title}
            <Tooltip
              placement="top"
              overlay="I dont know what these tool tips are supposed to say"
              trigger="click"
            >
              <span className="tooltip" />
            </Tooltip>
          </h3>
          <h6 onClick={this.toggleVisibility}>
            {this.state.isExpanded ? 'Collapse' : 'Expand'}
            <span
              className={`collapse-icon ${
                this.state.isExpanded ? 'expanded' : ''
              }`}
            />
          </h6>
        </div>
        <CSSTransitionGroup
          transitionName="show-hide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <div className="session-bottom">
            {this.state.isExpanded && this.props.children}
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default CollapsibleHeader
