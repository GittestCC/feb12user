import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import KintoBlockCardContainer from '../../../containers/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCardContainer'

class KintoBlocksList extends Component {
  static propTypes = {
    kintoBlocks: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="my-kintoblocks">
        <div className="page-title">
          <h2>My KintoBlocks</h2>
          <Link to="create" className="button default">
            Create New KintoBlock
          </Link>
        </div>

        <div className="kintoblock-list">
          <Link to="create" className="kintoblock create">
            <div className="text">
              <img src="/images/icon-generic-kintoblock.svg" alt="" />
              <h3>Create New KintoBlock</h3>
            </div>
            <div className="icons">
              <div className="applications">
                <div className="application" />
              </div>
              <div className="add-new">
                <div className="inner" />
                <div className="pulsate" />
              </div>
            </div>
          </Link>

          {this.props.kintoBlocks.map((kintoBlock, i) => (
            <KintoBlockCardContainer
              kintoBlock={kintoBlock}
              key={i}
              index={i}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default KintoBlocksList
