import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class KintoblockList extends Component {
  state = {
    colors: [
      'purple',
      'lapis',
      'blue',
      'coral',
      'orange',
      'yellow',
      'green',
      'turquoise',
      'gray'
    ]
  }

  render() {
    return (
      <div className="my-kintoblocks">
        <div className="breadcrumbs">KintoBlocks</div>

        <div className="page-title">
          <h2>My KintoBlocks</h2>
          <Link to="create" className="button default">
            Create New Kintoblock
          </Link>
        </div>

        <div className="kintoblock-list">
          <div className="kintoblock create">
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
          </div>

          {this.state.colors.map((color, i) => (
            <div key={i} className={`kintoblock ${color}`}>
              <div className="text">
                <h3>Kintoblock Name</h3>
                <h4 className="version">1.0.2</h4>
              </div>
              <div className="icons">
                <div className="applications">
                  <div className="application" />
                  <div className="application" />
                </div>
                <div className="menu" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default KintoblockList
