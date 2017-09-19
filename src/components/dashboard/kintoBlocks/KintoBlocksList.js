import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import KintoBlockCardContainer from '../../../containers/dashboard/kintoBlocks/kintoBlocksList/KintoBlockCardContainer'

class KintoBlocksList extends Component {
  componentDidMount() {
    this.props.fetchKintoBlocks()
  }

  render() {
    return (
      <div className="my-kintoblocks">
        <div className="breadcrumbs">
          <a className="disabled">KintoBlocks</a>
        </div>

        <div className="page-title">
          <h2>My KintoBlocks</h2>
          <Link to="create" className="button default">
            Create New Kintoblock
          </Link>
        </div>

        <div className="kintoblock-list">
          <Link to="create" className="kintoblock create">
            <div className="text">
              <h3>Create New Kintoblock</h3>
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
