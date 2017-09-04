import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import FieldValidation from '../../forms/FieldValidation'
import Button from '../../forms/Button'
import { required, email } from '../../../helpers/validators'

class ContactForm extends Component {
  state = {
    isSubmitted: false
  }

  onSubmit = e => {
    const result = this.props.handleSubmit(e)
    if (this.props.valid) {
      result.then(() => {
        this.setState({ isSubmitted: true })
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="names-field">
          <div className="name-field">
            <Field
              name="firstName"
              label="First Name"
              placeholder="Jonathon"
              component={FieldValidation}
              validate={required}
              type="text"
            />
          </div>
          <div className="name-field">
            <Field
              name="lastName"
              label="Last Name"
              placeholder="Snow"
              component={FieldValidation}
              validate={required}
              type="text"
            />
          </div>
        </div>
        <div className="email-field">
          <Field
            name="emailAddress"
            label="Email"
            placeholder="jsnow@thewall.com"
            component={FieldValidation}
            validate={[required, email]}
            type="email"
          />
        </div>
        <div className="full-width-field">
          <label htmlFor="messageType">Message type</label>
          <Field name="messageType" component={FieldValidation} type="select">
            <option value="General Enquiry">General Enquiry</option>
            <option value="Request Early Access">Request Early Access</option>
          </Field>
        </div>
        <div className="full-width-field">
          <Field
            name="message"
            label="Message"
            placeholder="Please enter your message"
            component={FieldValidation}
            validate={required}
            type="textarea"
          />
        </div>
        <Button type="submit" isSubmitted={this.state.isSubmitted}>
          Send Message
        </Button>
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

export default reduxForm({ form: 'contactUs' })(ContactForm)
