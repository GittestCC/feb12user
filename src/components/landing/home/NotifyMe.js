import React, { Component } from 'react'

class NotifyMe extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: ''
  }

  handleInputChange = event => {
    const { value, name } = event.target

    this.setState({
      [name]: value
    })
    console.log('form data ', this.state)
  }

  render() {
    return (
      <form onSubmit={this.props.notifyUs} className="notify-form">
        <div className="names-field">
          <div className="name-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="name"
              id="firstName"
              placeholder="Jonathon"
              onChange={this.handleInputChange}
              value={this.state.firstName}
              required
            />
          </div>
          <div className="name-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="name"
              id="lastName"
              placeholder="Snow"
              onChange={this.handleInputChange}
              value={this.state.lastName}
              required
            />
          </div>
        </div>
        <div className="email-field">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="email"
            name="name"
            id="emailAddress"
            placeholder="jsnow@thewall.com"
            onChange={this.handleInputChange}
            value={this.state.emailAddress}
            required
          />
        </div>
        <button className="button default" type="submit">
          Notify Me
        </button>
        <h5 className="byline bold">
          We'll stick to sending you cool updates & notifying you when we
          officially launch
        </h5>
        <h5 className="byline">
          No Spam - pinky promise. Unsubscribe at anytime.
        </h5>
      </form>
    )
  }
}

export default NotifyMe
