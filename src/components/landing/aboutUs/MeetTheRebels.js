import React, { Component } from 'react'

class MeetTheRebels extends Component {
  state = {
    isFaded: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setRibbonVisibility)
    this.setRibbonVisibility()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setRibbonVisibility)
  }

  setRibbonVisibility = () => {
    this.setState(state => {
      const isFaded = window.scrollY > 175
      if (state.isFaded === isFaded) {
        return null
      }
      return { isFaded }
    })
  }

  render() {
    return (
      <div className="meet-the-rebels">
        <div className={`ribbons ${this.state.isFaded ? 'faded' : ''}`} />
        <div className="content">
          <div className={`fixed-header ${this.state.isFaded ? 'faded' : ''}`}>
            <h1>Meet the rebels.</h1>
            <h3>
              Programmers, designers, gamers, tech & animal lovers - all with
              one common goal
            </h3>
          </div>

          <div className="text-with-image">
            <img src={require('../../../images/about-us-mission.jpg')} alt="" />
            <div className="text">
              <h4>
                Our mission is to create an amazing platform for developers to
                build, combine, buy and sell feature-blocks of code while
                optimizing costs and reliability at scale.
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MeetTheRebels
