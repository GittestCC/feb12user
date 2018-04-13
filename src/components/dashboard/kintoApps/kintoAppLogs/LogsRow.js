import React, { Component } from 'react'
import moment from 'moment'
import { timeDayMonthYearShort } from '../../../../constants/dateFormat'

class LogsRow extends Component {
  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  render() {
    const { row } = this.props
    return (
      <div className="row" onClick={this.toggleExpand}>
        <ul
          className={`unstyled-list header ${
            this.state.isExpanded ? 'active' : ''
          }`}
        >
          <li className="column one">
            <h5>{row.severity}</h5>
          </li>
          <li className="column two">
            <h5>{row.responsecode}</h5>
          </li>
          <li className="column three">
            <h5>{row.kintoblockName}</h5>
          </li>
          <li className="column four">
            {/* TODO: add condional for correct icon */}
            <div className="image tag" />
            <h5>{row.versionInfo}</h5>
          </li>
          <li className="column five">
            <h5>{moment(row.timestamp).format(timeDayMonthYearShort)}</h5>
          </li>
        </ul>

        <div
          className={`expanding-details ${
            this.state.isExpanded ? 'expanded' : ''
          }`}
          id="1"
        >
          <h3 className="bold">Request</h3>
          <div className="details">
            <pre>
              <code className="language-json">{row.requestJson}</code>
            </pre>
          </div>
          <h3 className="bold">Response</h3>
          <div className="details">
            <pre>
              <code className="language-json">{row.responseJson}</code>
            </pre>
          </div>

          <button className="button secondary" type="button">
            Report An Issue
          </button>
        </div>
      </div>
    )
  }
}

export default LogsRow
