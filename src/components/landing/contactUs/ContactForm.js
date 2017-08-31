import React, { Component } from 'react'
import Email from '../../../lib/smtp'

class ContactForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    messageType: '',
    message: ''
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  sendMessage = e => {
    e.preventDefault()
    Email.send('sender@text.com', 'reciver@test.com', 'subject', 'body', {
      token: process.env.REACT_APP_SMTP_KEY
    })
  }

  render() {
    return (
      <form onSubmit={this.sendMessage}>
        <div className="names-field">
          <div className="name-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
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
              name="lastName"
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
            name="emailAddress"
            id="emailAddress"
            placeholder="jsnow@thewall.com"
            onChange={this.handleInputChange}
            value={this.state.emailAddress}
            required
          />
        </div>
        <div className="full-width-field">
          <label htmlFor="messageType">Message type</label>
          <select
            name="messageType"
            id="messageType"
            onChange={this.handleInputChange}
            value={this.state.messageType}
            required
          >
            <option value="General Enquiry">General Enquiry</option>
            <option value="Request Early Access">Request Early Access</option>
          </select>
        </div>
        <div className="full-width-field">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Please enter your message"
            onChange={this.handleInputChange}
            value={this.state.message}
            required
          />
        </div>
        <button type="submit" className="button default">
          Send Message
        </button>

        <h5 className="byline bold center ">
          We’ll send you cool updates and notify you when we offically launch.
        </h5>
        <h5 className="byline center">
          Pinky promise there won’t be any spam. Unsubscribe at any time.
        </h5>
      </form>
    )
  }
}

export default ContactForm
