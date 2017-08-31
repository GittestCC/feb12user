import React, { Component } from 'react'
import Waypoint from 'react-waypoint'

class MeetTheRebels extends Component {
  state = {
    toFade: ''
  }

  adjustBackgroundLeave = ({ currentPosition, waypointTop }) => {
    this.setState({ toFade: currentPosition === 'above' ? 'faded' : '' })
  }

  render() {
    return (
      <div className="meet-the-rebels">
        <div className={`ribbons ${this.state.toFade}`} />
        <div className="content">
          <div className={`fixed-header ${this.state.toFade}`}>
            <h1>Meet the rebels.</h1>
            <h3>
              Programmers, designers, gamers, tech & animal lovers - all with
              one common goal
            </h3>
          </div>

          <Waypoint
            onEnter={this.adjustBackgroundLeave}
            onLeave={this.adjustBackgroundLeave}
            topOffset="70%"
          >
            <div className="text-with-image">
              <img
                src={require('../../../images/about-us-mission.jpg')}
                alt=""
              />
              <div className="text">
                <h4>
                  Our mission to build an amazing platform for developers to
                  buy, combine, and sell feature-blocks of code while optimizing
                  costs and reliability at scale.
                </h4>
              </div>
            </div>
          </Waypoint>
        </div>
      </div>
    )
  }
}

export default MeetTheRebels
