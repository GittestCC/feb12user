import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

class MeetTheRebels extends Component {
  state = {
    toFade: ''
  };

  adjustBackgroundLeave = ({ currentPosition, waypointTop }) => {
    this.setState({ toFade: currentPosition === 'above' ? 'faded' : '' });
  };

  render() {
    return (
      <div className="meet-the-rebels">
        <div className={`ribbons ${this.state.toFade}`} />
        <div className="content">
          <h1>Meet the rebels.</h1>
          <h3>
            Programmers, designers, gamers, cat lovers, dog lovers - all with
            one common goal.
          </h3>

          <Waypoint
            onEnter={this.adjustBackgroundLeave}
            onLeave={this.adjustBackgroundLeave}
            topOffset="45%"
          >
            <div className="text-with-image">
              <img src={require('../../../images/about-us-mission.jpg')} alt="" />
              <div className="text">
                <h4>
                  Our mission is to build a platform for developers to buy and
                  sell feature-blocks of code while optimizing costs and
                  reliability at scale.
                </h4>
              </div>
            </div>
          </Waypoint>
        </div>
      </div>
    );
  }
}

export default MeetTheRebels;
