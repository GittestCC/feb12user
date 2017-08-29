import React, { Component } from 'react';

class ContactForm extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    message: '',
    messageType: ''
  }

  handleInputChange = event => {
    const { value, name } = event.target

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form action="">
        <div className="names-field">
          <div className="name-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="sausage"
              onChange={this.handleInputChange}
              value={this.state.firstName}
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
            />
          </div>
        </div>
        <div className="email-field">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            placeholder="jonathon@thewall.com"
            onChange={this.handleInputChange}
            value={this.state.emailAddress}
          />
        </div>
        <div className="full-width-field">
          <label htmlFor="messageType">Message type</label>
          <select
            name="messageType"
            id="messageType"
            onChange={this.handleInputChange}
            value={this.state.messageType}
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
          />
        </div>
        <div className="button default">Send Message</div>

        <h5 className="byline bold center ">
          We’ll send you cool updates and notify you when we offically launch.
        </h5>
        <h5 className="byline center">
          Pinky promise there won’t be any spam. Unsubscribe at any time.
        </h5>
      </form>
    );
  }
}

export default ContactForm;
