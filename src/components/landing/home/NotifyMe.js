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
  }

  render() {
    return (
      <form
        action="//kintohub.us16.list-manage.com/subscribe/post?u=7bdeb03a2507e86ff35f49d01&id=96f27c293a"
        method="post"
        name="mc-embedded-subscribe-form"
        className="notify-form"
      >
        <div className="names-field">
          <div className="name-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="FNAME"
              id="firstName"
              placeholder="Jonathan"
              className="input-lg"
              required
            />
          </div>
          <div className="name-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="LNAME"
              id="lastName"
              placeholder="Snow"
              className="input-lg"
              required
            />
          </div>
        </div>
        <div className="email-field">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="email"
            name="EMAIL"
            id="emailAddress"
            placeholder="jsnow@thewall.com"
            className="input-lg"
            required
          />
        </div>
        <button className="button default btn-lg" type="submit">
          Notify Me
        </button>
        <h5 className="byline bold">
          We'll stick to cool updates & notifying you when we officially launch
        </h5>
        <h5 className="byline">
          No Spam - pinky promise. Unsubscribe at anytime.
        </h5>
      </form>
    )
  }
}

export default NotifyMe
